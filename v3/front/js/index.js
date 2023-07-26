const app = async () => {
    await navbarRender(getUser());
    await getAllCategoriesFromDB()
            .then( async categories => {
                await renderFilterCategoriesOptions(categories);
                await getAndShowAllProducts();
            })
            
}

app();
