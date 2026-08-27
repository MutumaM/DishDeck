from flask import Flask, request, jsonify, session
from flask_cors import CORS
from flask_login import LoginManager, login_user, logout_user, login_required, current_user
from models import db, User, Favorite

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///dishdeck.db"
app.config["SECRET_KEY"] = "replace-this"

db.init_app(app)
CORS(app, supports_credentials=True, origins=["http://localhost:5173"])

login_manager = LoginManager()
login_manager.init_app(app)

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

@app.route("/api/register", methods=[POST])
def register():
    data = request.get_json()

    existing = User.query.filter_by(email=data["email"]).first()
    if existing:
        return jsonify({"error": "Email already registered"}), 400

    user = User(email=data["email"])
    user.set_password(data["password"])
    db.session.add(user)

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

if __name__ == "__main__":
    app.run(port=5555, debug=True)