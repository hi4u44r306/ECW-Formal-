export default {
    name: 'products',
    type: 'document',
    title: 'All Products',
    fields: [
        {
            name: 'title',
            title: 'Name',
            type: 'string',
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            }
        }
    ]
}