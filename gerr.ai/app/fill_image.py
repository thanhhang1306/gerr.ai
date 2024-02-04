from PIL import Image
import numpy as np
import cv2
import matplotlib.pyplot as plt

FILL = [128, 128, 128]

def get_filled_img(filename):
    image = Image.open(filename)
    image_arr = np.array(image)

    img_colors = 255 * np.ones(image_arr[:, :, :3].shape)
    alphas = image_arr[:, :, 3]
    img_colors[alphas.nonzero()] = FILL

    filled_img = img_colors.copy().astype('int32')
    cv2.floodFill(filled_img, None, (img_colors.shape[0]//2, img_colors.shape[1]//2), FILL)

    return filled_img



