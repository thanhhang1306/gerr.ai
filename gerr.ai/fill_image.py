from PIL import Image
import numpy as np
import cv2

FILL = [128, 128, 128]

def get_filled_img(filename):
    image = Image.open(filename)
    image_arr = np.array(image)
    start_x = image_arr.shape[1]//2
    start_y = image_arr.shape[0]//2
    print(start_x, start_y)
    print(image_arr)
    print(image_arr.shape)
    filled_img = image_arr[:, :, :3].copy().astype('int32')
    cv2.floodFill(filled_img, None, (start_x, start_y), FILL)

    return filled_img



