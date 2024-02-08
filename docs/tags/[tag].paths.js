// tags/[tag].paths.js
import fs from 'fs'
import path from 'path'

export default {
    paths() {
        const tagsDirectory = path.resolve(__dirname, '../note');
        const files = fs.readdirSync(tagsDirectory);
        const tags = new Set();

        files.forEach(file => {
            const content = fs.readFileSync(path.resolve(tagsDirectory, file), 'utf-8');
            // 仮にフロントマターからタグを抽出する正規表現（フロントマターの形式に依存）
            const match = content.match(/tags: \[(.*?)\]/);
            if (match) {
                match[1].split(', ').forEach(tag => tags.add(tag));
            }
        });

        return Array.from(tags).map(tag => ({
            params: { tag }
        }));
    }
}
