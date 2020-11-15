export enum Section {
    Categories = 1,
    Services = 2
}

export interface CategoryItem {
    name: string;
    id: string;
}

export interface ServiceItem{
    name: string;
    id: string;
    categoryId: string;
}

export const defaultCategory: CategoryItem = {
    name: 'Todas las categorias',
    id: '0'
}

export function wellWrittenC(item: CategoryItem){
    const formal = item.name[0].toUpperCase() + item.name.slice(1);
        return {
            name: formal,
            id: item.id
    } as CategoryItem
}

export function wellWrittenS(item: ServiceItem){
    const formal = item.name[0].toUpperCase() + item.name.slice(1);
        return {
            name: formal,
            id: item.id,
            categoryId: item.categoryId
    } as ServiceItem
}