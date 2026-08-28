import os
from flask import Flask, request, jsonify, session
from flask_cors import CORS
from flask_login import LoginManager, login_user, logout_user, login_required, current_user
from models import db, User, Favorite

app = Flask(__name__)

db_url = os.environ.get("DATABASE_URL", "sqlite:///dishdeck.db")
if db_url.startswith("postgres://"):
      db_url = db_url.replace("postgres://", "postgresql://", 1)
app.config["SQLALCHEMY_DATABASE_URI"] = db_url
app.config["SECRET_KEY"] = os.environ.get("SECRET_KEY", "dev-fallback-key")


db.init_app(app)
with app.app_context():
    db.create_all()

CORS(app, supports_credentials=True, origins=[
    "http://localhost:5173",
    "https://dish-deck-sigma.vercel.app"
])

login_manager = LoginManager()
login_manager.init_app(app)

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

@app.route("/api/register", methods=["POST"])
def register():
    data = request.get_json()

    existing = User.query.filter_by(email=data["email"]).first()
    if existing:
        return jsonify({"error": "Email already registered"}), 400

    user = User(email=data["email"])
    user.set_password(data["password"])
    db.session.add(user)
    db.session.commit() 

    login_user(user)
    return jsonify(user.to_dict()), 201

@app.route("/api/logout", methods=["DELETE"])
def logout():
    logout_user()
    return {}, 204

@app.route("/api/me")
def me():
    if current_user.is_authenticated:
        return jsonify(current_user.to_dict())
    return jsonify({"error": "Not logged in"}), 401

@app.route("/api/login", methods=["POST"])
def login():
    data = request.get_json()
    user = User.query.filter_by(email = data["email"]).first()

    if not user or not user.check_password(data["password"]):
        return jsonify({"error": "Invalid email or password"}), 401

    login_user(user)
    return jsonify(user.to_dict())

@app.route("/api/favorites", methods = ["POST"])
@login_required
def add_favorite():
    data = request.get_json()

    existing = Favorite.query.filter_by(
        user_id=current_user.id,
        place_id=data["place_id"]
    ).first()

    if existing:
        return jsonify({"error": "Already saved"}), 400

    favorite = Favorite(
        place_id=data["place_id"],
        restaurant_name=data["restaurant_name"],
        note=data.get("note"),
        user_id=current_user.id
    )
    db.session.add(favorite)
    db.session.commit()

    return jsonify(favorite.to_dict()), 201

@app.route("/api/favorites/<int:id>", methods=["DELETE"])
@login_required
def delete_favorite(id):
    favorite = Favorite.query.get(id)

    if not favorite:
        return jsonify({"error": "Favorite not found"}), 404

    if favorite.user_id != current_user.id:
        return jsonify({"error": "Not authorized"}), 403

    db.session.delete(favorite)
    db.session.commit()
    return {}, 204

@app.route("/api/favorites", methods=["GET"])
@login_required
def get_favorites():
    favorites = Favorite.query.filter_by(user_id=current_user.id).all()
    return jsonify([f.to_dict() for f in favorites])

@app.route("/api/favorites/check/<place_id>")
@login_required
def check_favorite(place_id):
    favorite = Favorite.query.filter_by(
        user_id=current_user.id,
        place_id=place_id
    ).first()

    if favorite:
        return jsonify({"is_saved": True, "favorite_id": favorite.id})
    return jsonify({"is_saved": False})

if __name__ == "__main__":
    app.run(port=5555, debug=True)