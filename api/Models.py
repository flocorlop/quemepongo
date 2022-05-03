from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Outfits(db.Model):
    id = db.Column(db.Integer, primary_key=True,nullable=False)
    percentage = db.Column(db.String(2), nullable=False)
    title = db.Column(db.String(50), nullable=False)
    imageURL = db.Column(db.String(200), nullable=False)
    description = db.Column(db.String(500), nullable=False)
    visible = db.Column(db.Integer, nullable=False)

    def __init__(self,rowid, percentage,title,imageURL,description,vis):
        super().__init__()
        self.id = rowid
        self.percentage = percentage
        self.title = title
        self.imageURL = imageURL
        self.description = description
        self.visible = vis

    def __str__(self):
        return "\nId: {}. Percentage: {}. Title: {}. ImageURL: {}. Description: {}.\n Visible: {}".format(
            self.id,
            self.percentage,
            self.title,
            self.imageURL,
            self.description,
            self.visible
        )  

    def serialize(self):
        return {
            "id": self.id,
            "percentage": self.percentage,
            "title": self.title,
            "imageURL": self.imageURL,
            "description": self.description,
            "visible": self.visible
        }    
class Profiles(db.Model):
    id = db.Column(db.Integer, primary_key=True,nullable=False)
    name = db.Column(db.String(50), nullable=False)
    username = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(50), nullable=False)
    imageURL = db.Column(db.String(200), nullable=False)
    visible = db.Column(db.Integer, nullable=False)

    def __init__(self,rowid, name,username,email, imageURL, vis):
        super().__init__()
        self.id = rowid
        self.name = name
        self.username = username
        self.email = email
        self.imageURL = imageURL
        self.visible = vis

    def __str__(self):
        return "\nId: {}. Name: {}. Username: {}. Email: {}. \n Visible: {}".format(
            self.id,
            self.name,
            self.username,
            self.email,
             self.imageURL,
             self.visible
        )  

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "username": self.username,
            "email": self.email,
            "imageURL": self.imageURL,
            "visible" : self.visible
        }    
