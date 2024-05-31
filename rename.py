import os

def rename_files_in_folder(folder_path, cards, prefix='img', extension='png'):
    # Get a list of all files in the folder
    files = os.listdir(folder_path)
    # Filter only files (exclude directories)
    files = [f for f in files if os.path.isfile(os.path.join(folder_path, f))]

    # Sort the files for consistent naming
    files.sort()

    ind=0
    # Rename each file
    for index, filename in enumerate(files):
        new_name = f"{cards[int(ind/4)]}{ind%4}.{extension}"
        ind+=1
        src = os.path.join(folder_path, filename)
        dst = os.path.join(folder_path, new_name)
        os.rename(src, dst)
        print(f'Renamed: {src} to {dst}')

# Example usage
cards = ['2','3','4','5','6','7','8','9','0','A','J','K','Q']
folder_path = "C:\\Users\\Acer\\Desktop\\Cards\\x"
rename_files_in_folder(folder_path,cards)
