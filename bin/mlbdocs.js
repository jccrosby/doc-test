import fs from 'fs';
import fse from 'fs-extra';
import path from 'path';
import { globby } from 'globby';

const DOC_ROOT = 'docs';
const NAV_MD_FILE = `${DOC_ROOT}/_nav.md`;
const DOC_DIR_NAME = '__mlbdoc__';
const navCollection = [];

const capatilize = (value) => {
    return `${value.charAt(0).toUpperCase()}${value.slice(1)}`;
};

const addToNav = (destDir) => {
    const linkPath = destDir.replace(DOC_ROOT, '.');
    const linkPathList = destDir.split('/');
    const linkPathListLen = linkPathList.length;
    const fileName = linkPathList[linkPathListLen - 1];
    const linkLabel = capatilize(fileName.split('.')[0]);
    const nestLevel = linkPath.split('/').length - 3;

    navCollection.push({
        label: linkLabel,
        path: linkPath,
        nestLevel,
    });
};

const getSpaces = (count) => {
    let spaces = '';
    for (let i = 0; i < count; i++) {
        spaces = `${spaces} `;
    }
    return spaces;
};

const createNavMarkdown = (collection) => {
    let markdown = '';
    collection.forEach((navItem) => {
        markdown += `${getSpaces(navItem.nestLevel)}- [${navItem.label}](${navItem.path})\n`;
    });
    return markdown;
};

const writeNavMarkdown = (contents) => {
    const navFile = path.join(process.cwd(), NAV_MD_FILE);
    console.log('navFile', navFile);
    fs.writeFile(navFile, contents, '', (error) => {
        if (error) {
            console.log(`There was an erorr writing the contents of ${NAV_MD_FILE}.`, error);
        } else {
            console.log(`Done writing contents of ${NAV_MD_FILE}.`);
        }
    });
};

const copyDoc = (srcDir, destDir) => {
    try {
        //copySync(source, destination, overwrite, callback);
        fse.copySync(srcDir, destDir, { overwrite: true });
        //console.log('Copied file', srcDir, 'to', destDir);
    } catch (error) {
        //console.log('Error copying file', error);
    }
};

// Copy the base readme
copyDoc(path.join(process.cwd(), './README.md'), path.join(process.cwd(), 'docs/README.md'));

(async () => {
    const mlbDocPaths = await globby(['src', DOC_DIR_NAME], {
        expandDirectories: {
            extensions: ['md'],
        },
    });
    mlbDocPaths.forEach((docPath) => {
        let destPath = docPath.replace(`${DOC_DIR_NAME}/`, '');
        destPath = destPath.replace('src', DOC_ROOT);
        addToNav(destPath);
        copyDoc(path.join(process.cwd(), docPath), path.join(process.cwd(), destPath));
    });
    const navMarkdown = createNavMarkdown(navCollection);
    writeNavMarkdown(navMarkdown);
})();
