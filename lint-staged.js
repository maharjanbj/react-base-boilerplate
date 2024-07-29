

// module.exports = {
//     '*.{js,jsx,ts,tsx}': [
//         'eslint --max-warnings=0',
//         'react-scripts test --bail --watchAll=false --findRelatedTests --passWithNoTests',
//         () => 'tsc-files --noEmit',
//     ],
//     '*.{js,jsx,ts,tsx,json,css,js}': ['prettier --write'],
// }
module.exports = {
    'src/**/*.{js,jsx,ts,tsx,json,css,scss,md}': ['prettier --write'],
}
