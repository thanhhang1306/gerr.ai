import sys
sys.path.append("..")
sys.path.append("./app")

from flask import request, jsonify, render_template
from bson import json_util
import json
from app import app  # Import the Flask app instance and the MongoDB database instance
import datetime
import requests
from flask_cors import CORS, cross_origin
import pandas as pd
import base64
from PIL import Image
from io import BytesIO
from compactness_scores import *
from fill_image import get_filled_img
from gpt_response import get_response

FILENAME = 'user_drawing.png'

def add_alpha_channel(rgb_image):
    # Create an alpha channel with fully opaque values
    alpha_channel = np.ones((rgb_image.shape[0], rgb_image.shape[1]), dtype=np.uint8) * 255

    # Add the alpha channel to the RGB image
    rgba_image = np.dstack((rgb_image, alpha_channel))

    return rgba_image

@app.route('/upload_pic', methods=['POST'])
def upload_pic():
    # # save pic in filename
    # base64_png = "????"

    # image_data = base64.b64decode(base64_png)

    # # Create a BytesIO object to read the decoded image data
    # image_stream = BytesIO(image_data)

    # # Open the image using PIL
    # image = Image.open(image_stream)

    # # Save the image as a PNG file
    # image.save(FILENAME, format="PNG")
    # Extract base64 string from the request
    data = request.get_json()
    base64_png = data['image']
    
    # Strip the header if present
    if base64_png.startswith('data:image/png;base64,'):
        base64_png = base64_png.replace('data:image/png;base64,', '')

    # Decode the base64 string
    image_data = base64.b64decode(base64_png)

    # Create a BytesIO object to read the decoded image data
    image_stream = BytesIO(image_data)

    # Open the image using PIL
    try:
        image = Image.open(image_stream)
    except UnidentifiedImageError as e:
        return jsonify({'error': 'Failed to process image data'}), 400

    # Save the image as a PNG file
    image.save(FILENAME, format="PNG")


    filled_img = get_filled_img(FILENAME)
    print(filled_img)
    print(filled_img.shape)
    scores = {'area': area(filled_img),
          'perimeter': perimeter(filled_img),
          'pp': polsby_popper(filled_img),
          'schwartz': schwartzberg(filled_img),
          'reock': reock(filled_img),
          'convex': convex_hull(filled_img),
          'lw': length_width(filled_img)}
    

    
    
    text_response = get_response(scores)
    # text_response = "Here's my text response!"

    buffered = BytesIO()
    new_fill = add_alpha_channel(filled_img)
    pil_img = Image.fromarray(new_fill.astype('uint8'))
    pil_img.save(buffered, format="PNG")
    
    processed_image_base64 = base64.b64encode(buffered.getvalue()).decode()



    response_data = {
        'image': processed_image_base64,
        'text_response': text_response
    }
    print(response_data)
    return jsonify(response_data)
