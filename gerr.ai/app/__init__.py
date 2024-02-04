from flask import Flask
from flask_cors import CORS

# Create the Flask app instance
app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})

# Import and register routes at the end
from app import routes