enum Section {
    Categories = 1,
    Services = 2
}

interface ListItem{
    name: string;
    id: string;
}

interface ServiceItem extends ListItem{
    categoryId: string;
}

const defaultCategory: ListItem = {
    name: 'Todas',
    id: '0'
}

function functionCast(item: ListItem|ServiceItem){
    return{
        name: item.name,
        id: item.id
    } as ListItem
}

function wellWrittenC(item: ListItem){
    const formal = item.name[0].toUpperCase() + item.name.slice(1);
        return {
            name: formal,
            id: item.id
    } as ListItem
}

function wellWrittenS(item: ServiceItem){
    const formal = item.name[0].toUpperCase() + item.name.slice(1);
        return {
            name: formal,
            id: item.id,
            categoryId: item.categoryId
    } as ServiceItem
}

export {Section, ListItem,ServiceItem, defaultCategory, functionCast, wellWrittenC, wellWrittenS}