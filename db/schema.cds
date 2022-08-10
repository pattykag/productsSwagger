using {
    cuid,
    Country
} from '@sap/cds/common';

namespace Products;

entity Products : cuid { //una sola categoria
    @mandatory productName  : String;
    @mandatory supplier     : Association to Suppliers;
    @mandatory category     : Association to Categories;
    quantityPerUnit         : String;
    @mandatory unitPrice    : Decimal(10, 2);
    @mandatory unitsInStock : Integer;
    unitsOnOrder            : Integer;
    reorderLevel            : Integer;
    discontinued            : Boolean;
}

entity Suppliers { //muchos productos
    @mandatory key ID      : Integer;
    @mandatory companyName : String;
    @mandatory contactName : String;
    contactTitle           : String;
    address                : String;
    city                   : String;
    region                 : String;
    postalCode             : String;
    country                : String(3);
    phone                  : String;
    fax                    : String;
    homePage               : String;
    product                : Association to many Products
                                 on product.supplier = $self;
}

entity Categories {
    @mandatory key ID       : Integer;
    @mandatory categoryName : String;
    description             : String;
    product                 : Association to many Products
                                  on product.category = $self;
}
