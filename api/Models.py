from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Outfits(db.Model):
    rowid = db.Column(db.Integer, primary_key=True)
    percentage = db.Column(db.String(2), nullable=False)
    title = db.Column(db.String(50), nullable=False)
    imageURL = db.Column(db.String(200), nullable=False)
    description = db.Column(db.String(500), nullable=False)

    def __init__(self,rowid, percentage,title,imageURL,description):
        super().__init__()
        self.rowid = rowid
        self.percentage = percentage
        self.title = title
        self.imageURL = imageURL
        self.description = description

    def __str__(self):
        return "\nId: {}. Percentage: {}. Title: {}. ImageURL: {}. Description: {}.\n".format(
            self.rowid,
            self.percentage,
            self.title,
            self.imageURL,
            self.description
        )  

    def serialize(self):
        return {
            "rowid": self.rowid,
            "percentage": self.percentage,
            "title": self.title,
            "imageURL": self.imageURL,
            "description": self.description
        }    
