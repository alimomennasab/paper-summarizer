# go through a pdf document and parse all of the text
# split paper into its sections 
# dictionary: key = section, value = text of section. Images?

import pymupdf

pdf_path = "Attention Is All You Need.pdf"

def parse_pdf(pdf_path):
    doc = pymupdf.open(pdf_path)
    out = open("output.txt", "wb")
    for page_index in range(len(doc)): # iterate over pdf pages
        print("Processing page", page_index + 1, "of", len(doc))
        page = doc[page_index] # get the page
        text = page.get_text().encode("utf8")
        out.write(text)
        out.write(bytes((12,)))
        image_list = page.get_images()

        # print the number of images found on the page
        if image_list:
            print(f"Found {len(image_list)} images on page {page_index + 1}")
        else:
            print("No images found on page", page_index)

        for image_index, img in enumerate(image_list, start=1): # enumerate the image list
            xref = img[0] # get the XREF of the image
            pix = pymupdf.Pixmap(doc, xref) # create a Pixmap

            if pix.n - pix.alpha > 3: # CMYK: convert to RGB first
                pix = pymupdf.Pixmap(pymupdf.csRGB, pix)

            pix.save("page_%s-image_%s.png" % (page_index, image_index)) # save the image as png
            pix = None

        print("")
            
    out.close()
parse_pdf(pdf_path)