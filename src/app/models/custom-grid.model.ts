export interface TableColumn {
   columnDef: string;
   header: string
}
export interface TableButtonAction {
   name: string
   value?: any
}

export const TableConsts = {
   actionButton: {
      edit: 'edit',
      delete: 'delete',
      view: 'delete',
   },
}
