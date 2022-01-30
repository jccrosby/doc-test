import fse from 'fs-extra';
import path from 'path';
import { globby } from 'globby';

const copyDirectory = (srcDir, destDir) => {
    console.log(`COPY: `, srcDir, '-->', destDir);
    //copySync(source, destination, overwrite, callback);

    try {
        fse.copySync(srcDir, destDir);
        console.log('Success!', destDir);
    } catch (error) {
        console.log('ERROR', error);
    }
};

(async () => {
    const mlbDocPaths = await globby(['src', '__mlbdoc__'], {
        expandDirectories: {
            extensions: ['md'],
        },
    });
    mlbDocPaths.forEach((docPath) => {
        let destPath = docPath.replace('__mlbdoc__/', '');
        destPath = destPath.replace('src', '__mlbdocs__');
        copyDirectory(path.join(process.cwd(), docPath), path.join(process.cwd(), destPath));
    });
    //copyDirectory(mlbDocPaths);
})();
