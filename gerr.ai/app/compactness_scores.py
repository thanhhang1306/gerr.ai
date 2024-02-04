import math
import numpy as np
import cv2

FILL = [128, 128, 128]

def is_filled(loc, filled_img):
    color = filled_img[loc[0], loc[1], :]
    for i in range(3):
        if color[i] != FILL[i]:
            return False
    return True

def area(filled_img):
    area = 0
    for i in range(filled_img.shape[0]):
        for j in range(filled_img.shape[1]):
            if is_filled([i, j], filled_img):
                area += 1
    return area

def perimeter(filled_img):
    mask = np.zeros((filled_img.shape[0], filled_img.shape[1]))
    for i in range(filled_img.shape[0]):
        curr_filled = False
        for j in range(filled_img.shape[1]):
            if is_filled([i, j], filled_img):
                if not curr_filled:
                    mask[i, j] = 1
                curr_filled = True
            else:
                if curr_filled:
                    mask[i, j] = 1
                curr_filled = False

    for i in range(filled_img.shape[1]):
        curr_filled = False
        for j in range(filled_img.shape[0]):
            if is_filled([j, i], filled_img):
                if not curr_filled:
                    mask[j, i] = 1
                curr_filled = True
            else:
                if curr_filled:
                    mask[j, i] = 1
                curr_filled = False
    
    filled_img[mask == 1] = [0, 0, 0]
    return mask.sum()

def get_img_contour(filled_img):
    print("Filled image", filled_img)
    print(filled_img.sum())
    gray_image = cv2.cvtColor(np.float32(filled_img), cv2.COLOR_BGR2GRAY)

    gray_image = cv2.convertScaleAbs(gray_image)
    print("Gray image", gray_image)
    print((gray_image == 128).sum())
    # Find contours in the grayscale image
    contours, _ = cv2.findContours(gray_image//255, cv2.RETR_CCOMP, cv2.CHAIN_APPROX_SIMPLE)
    new_contour = []
    for i in range(1, len(contours)):
        for j in contours[i]:
            new_contour.append(j)
    return np.array(new_contour)

def polsby_popper(filled_img):
    Ad = area(filled_img)
    Pd = perimeter(filled_img)
    return 4 * math.pi * Ad / (Pd * Pd)

def schwartzberg(filled_img):
    Ad = area(filled_img)
    Pd = perimeter(filled_img)
    return 1/(Pd / (2 * math.pi * math.sqrt(Ad / (math.pi))))

def reock(filled_img):
    Ad = area(filled_img)
    img_cont = get_img_contour(filled_img)
    print(img_cont)
    center, radius = cv2.minEnclosingCircle(img_cont)
    Ambc = math.pi * radius * radius
    return Ad / Ambc

def convex_hull(filled_img):
    Ad = area(filled_img)
    img_cont = get_img_contour(filled_img)
    convex_hull = cv2.convexHull(img_cont)
    Amcp = cv2.contourArea(convex_hull)
    return Ad / Amcp

def length_width(filled_img):
    img_cont = get_img_contour(filled_img)
    rect = cv2.minAreaRect(img_cont)
    width, length = rect[1]
    return min(width, length) / max(width, length)
