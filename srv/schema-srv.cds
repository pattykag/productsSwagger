using {Products as my} from '../db/schema';

@Core         : {
    Description     : 'Exposición del servicio: ProductsService',
    LongDescription : 'Este servicio está localizado en [/products/](/)'
}
@Capabilities : {BatchSupport : {Supported : false}}
service ProductsService {
    // @Core         : {Description : '->Productos'}
    // @Capabilities : {TopSupported : false} // Disables Top
    // @Capabilities : {SkipSupported : false} // Disables Skip
    @Capabilities : {
        TopSupported       : false, // Disables Top
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

    }
    entity Products   as projection on my.Products;

    entity Suppliers  as projection on my.Suppliers;

    //@Permissions: {Write: true}
    @readonly
    entity Categories as projection on my.Categories;

    action batchProducts(value : array of Products) returns oMessage;

}

type oMessage {
    code    : Integer;
    message : String(255);
}
