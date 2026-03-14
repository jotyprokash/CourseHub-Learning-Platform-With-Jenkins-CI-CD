#!/usr/bin/env python3
"""
Asset generation script for PerkPoint coffee shop.
Generates logo, landing image, and workflow diagram.
"""

from PIL import Image, ImageDraw, ImageFont
import os

def create_logo():
    """Create a simple coffee cup logo"""
    img = Image.new('RGBA', (200, 200), (255, 255, 255, 0))
    draw = ImageDraw.Draw(img)

    # Coffee cup
    draw.ellipse([50, 100, 150, 180], fill=(139, 69, 19))
    draw.rectangle([60, 120, 140, 160], fill=(139, 69, 19))
    draw.rectangle([50, 140, 150, 180], fill=(139, 69, 19))

    # Steam
    draw.ellipse([70, 80, 90, 100], fill=(200, 200, 200))
    draw.ellipse([110, 70, 130, 90], fill=(200, 200, 200))

    return img

def create_landing_image():
    """Create a landing page image"""
    img = Image.new('RGB', (800, 400), (245, 245, 220))
    draw = ImageDraw.Draw(img)

    # Background pattern
    for i in range(0, 800, 50):
        draw.line([i, 0, i, 400], fill=(200, 200, 200), width=1)
    for i in range(0, 400, 50):
        draw.line([0, i, 800, i], fill=(200, 200, 200), width=1)

    # Coffee shop text
    try:
        font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 48)
    except:
        font = ImageFont.load_default()

    draw.text((200, 150), "Welcome to PerkPoint", fill=(139, 69, 19), font=font)
    draw.text((250, 220), "Premium Coffee & Pastries", fill=(139, 69, 19), font=font)

    return img

def create_workflow_diagram():
    """Create a simple workflow diagram"""
    img = Image.new('RGB', (600, 400), (255, 255, 255))
    draw = ImageDraw.Draw(img)

    # Draw boxes and arrows
    boxes = [
        (50, 150, 150, 200, "Code"),
        (200, 150, 300, 200, "Test"),
        (350, 150, 450, 200, "Build"),
        (500, 150, 550, 200, "Deploy")
    ]

    for x1, y1, x2, y2, text in boxes:
        draw.rectangle([x1, y1, x2, y2], outline=(0, 0, 0), width=2)
        draw.text((x1 + 10, y1 + 20), text, fill=(0, 0, 0))

        # Arrow to next box
        if x2 < 500:
            draw.line([x2, y1 + 25, x2 + 50, y1 + 25], fill=(0, 0, 0), width=2)
            draw.polygon([(x2 + 40, y1 + 20), (x2 + 50, y1 + 25), (x2 + 40, y1 + 30)], fill=(0, 0, 0))

    return img

def main():
    """Generate all assets"""
    os.makedirs('assets', exist_ok=True)

    print("Generating logo...")
    logo = create_logo()
    logo.save('assets/logo.png')

    print("Generating landing image...")
    landing = create_landing_image()
    landing.save('assets/landing.png')

    print("Generating workflow diagram...")
    workflow = create_workflow_diagram()
    workflow.save('assets/workflow.png')

    print("Assets generated successfully!")

if __name__ == "__main__":
    main()