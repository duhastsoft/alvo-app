export enum Section {
    Categories = 1,
    Services = 2
}

export interface ListItem {
    name: string;
    id: number;
}
export const defaultCategory: ListItem = {
    name: 'Todas las categorias',
    id: 0
}
