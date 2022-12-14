using {Products as my} from '../db/schema';

@Core         : {
    Description     : 'Exposición del servicio: ProductsService',
    LongDescription : 'Este servicio está localizado en [/products/](/)'
}
@Capabilities : {BatchSupport : {Supported : false}}
//@requires: 'authenticated-user' 
service ProductsService {
    // @Core         : {Description : '->Productos'}
    // @Capabilities : {TopSupported : false} // Disables Top
    // @Capabilities : {SkipSupported : false} // Disables Skip
    @Capabilities : {
        TopSupported       : true, // Disables Top
        SkipSupported      : false, // Disables Skip
        SortRestrictions   : {Sortable : false}, // Disables Sort
        ExpandRestrictions : {Expandable : false}, // Disables expand
        SelectSupport      : {Supported : false, }, // Disables select
        SearchRestrictions : {Searchable : false}, //Disables filter
        FilterRestrictions : {Filterable : false}, //Disables count
        CountRestrictions  : {Countable : false},
        ReadRestrictions   : { // READ
            Description           : 'Lista de Productos',
            ReadByKeyRestrictions : { // READ por ID
                Description : 'Obtener Producto por su ID',
                Readable    : true
            }
        },
        UpdateRestrictions : {
            Description  : 'Actualización de Producto por ID',
            UpdateMethod : #PATCH
        },
        InsertRestrictions : {Description : 'Ingresar un Producto por su ID'},
        DeleteRestrictions : {Description : 'Eliminar un Producto por su ID'},
        DeepInsertSupport  : {Supported : false}
    }
    entity Products   as projection on my.Products;

    //@Permissions: {Write: true}
    @readonly
    entity Categories as projection on my.Categories;

    entity Suppliers as projection on my.Suppliers;

    action batchProducts(value : array of Products) returns oMessage;

}

type oMessage {
    code    : Integer;
    message : String(255);
}