export default (config: any, argv: any) => {
    let tags = '';
    if (config.defaultTags) {
        tags = config.defaultTags.join(' and ');
    }

    if (argv.tags) {
        if (tags) tags += ' and ';
        argv.tags = argv.tags.replace('~', 'not ');
        tags += argv.tags;
    }

    console.log('Applying tag expression: ', tags);
    return tags;
};
