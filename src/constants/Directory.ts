enum Section {
    Categories = 1,
    Services = 2
}

interface ListItem{
    name: string;
    id: string;
    index: string;
}

interface ServiceItem extends ListItem{
    categoryId: string;
    states: string;
    cities: string;
}

const defaultCategory: ListItem = {
    name: 'Categorias',
    id: 'category-0',
    index: '0'
}
const defaultState: ListItem = {name: 'Departamentos', id: 'cities-'+'0', index: '0'};
const defaultCity: ListItem = {name: 'Municipios', id: 'states-'+'0', index: '0'};

function functionCast(item: ListItem|ServiceItem){
    return{
        name: item.name,
        id: item.id,
    } as ListItem
}

function wellWrittenC(item: ListItem, id: string){
    const formal = item.name[0].toUpperCase() + item.name.slice(1);
        return {
            name: formal,
            id: 'category-'+item.id,
            index: id
    } as ListItem
}

function wellWrittenS(item: ServiceItem, id: string){
    const formal = item.name[0].toUpperCase() + item.name.slice(1);
        return {
            name: formal,
            id: 'service-'+item.id,
            categoryId: item.categoryId,
            index: id,
            cities: item.cities,
            states: item.states
    } as ServiceItem
}

export {Section, ListItem,ServiceItem, defaultCategory, defaultCity, defaultState, functionCast, wellWrittenC, wellWrittenS}