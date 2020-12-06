/**
 * List of avaiable endpoints
 */
export const ENDPOINTS_DATA = {
    reports: [
        {
            id: 1, name: 'Most Outdated Page', description: "Returns the most outdated pate in a category",
            links: {
                href: '/wiki-query/most-outdated-page'
            }
        },
        {
            id: 2, name: 'Custom Query', description: "Allows user to input a custom SQL query and returns the result. Note that query should contain the limit clause",
            links: {
                href: '/wiki-query/custom-query'
            }
        }
    ]
};