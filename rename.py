import os

def rename_files_in_folder(folder_path, prefix='img', extension='png'):
    # Get a list of all files in the folder
    files = os.listdir(folder_path)
    # Filter only files (exclude directories)
    files = [f for f in files if os.path.isfile(os.path.join(folder_path, f))]

    # Sort the files for consistent naming
    files.sort()

    # Rename each file
    for index, filename in enumerate(files):
        new_name = f"{prefix}{index + 1}.{extension}"
        src = os.path.join(folder_path, filename)
        dst = os.path.join(folder_path, new_name)
        os.rename(src, dst)
        print(f'Renamed: {src} to {dst}')

# Example usage
folder_path = "C:\\Users\\Acer\\Desktop\\Cards\\PNG-cards-1.3"
rename_files_in_folder(folder_path)
