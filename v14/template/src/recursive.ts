import fs from "fs";
import path from "path";

/**
 * Recursively read all files in a directory.
 * @param {fs.PathLike} dirPath The path to the directory that will be recursively traversed.
 * @param {Array} arrayOfFiles The array that all files will be recursively pushed to.
 * @returns Returns an array of files.
 */

export function getAllFiles(dirPath: string): string[] {
  const files = fs.readdirSync(dirPath);

  // Recursively read all files in a directory
  let arrayOfFiles: string[] = [];
  files.forEach(function (file: string) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles.push(...getAllFiles(dirPath + "/" + file));
    } else {
      arrayOfFiles.push(path.join(dirPath, "/", file));
    }
  });

  return arrayOfFiles;
}