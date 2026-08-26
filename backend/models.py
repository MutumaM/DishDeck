from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin
from flask_bcrypt import generate_password_hash, check_password_hash

db = SQLAlchemy()

class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String, unique=True, nullable=False)
    password_hash = db.Column(db.string, nullable=False)

    favorites = db.relationship("Favorite", backref="user")

    def set_password(self, password):
        self.password_hash = generate_password_hash(password).decode("utf-8")

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def to_dict(self):
        return{"id": self.id, "email": self.email}

class Favorite(db.model):
    id = db.Column(db.Integer, primary_key=True)
    place_id = db.Column(db.String, nullable=False)
    restaurant_name = db.Column(db.String, nullable=False)
    note = db.Column(db.String)
    user_id = db.Column(db.Interger, db.ForeignKey("user.id"), nullable=False)

    def to_dict(self):
        return{
            "id": self.id,
            "place_id": self.place.id,
            "restaurant_name": self.restaurant_name,
            "note": self.note,
        }