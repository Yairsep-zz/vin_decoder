export { }
var fs = require('fs');
var path = require('path');

interface Car_Specs{
    country: string;
    manufacture: string;
    Make: string;
    Restraint_Type: string;
    Series: string;
    Body_Type: string;
    Engine_Type: string;
    Check_Digit: string;
    Model_Year: string;
    Plant: string;
    Production_Sequence: string;
}

const index_mapping = JSON.parse(fs.readFileSync(path.join('data','index_mapping.json'), "utf8"));
const countries = JSON.parse(fs.readFileSync(path.join('data','countries.json'), "utf8"));
const manufacturers = JSON.parse(fs.readFileSync(path.join('data','manufacters.json'), "utf8"));


//Ford & GM & Toyota
const Ford_specs = JSON.parse(fs.readFileSync(path.join('data','Ford_specs.json'), "utf8"));
const GM_specs = JSON.parse(fs.readFileSync(path.join('data','GM_specs.json'), "utf8"));
const Toyota_specs = JSON.parse(fs.readFileSync(path.join('data','Toyota_specs.json'), "utf8"));


// console.log(countries);
// console.log(manufacturers);
// console.log(index_mapping);

const validate = function (vin) {
    if (vin.length == 0) {
        console.log('Invalid VIN: Empty VIN');
        return false;
    }
    if (vin.length != 17) {
        console.log('Invalid VIN: Not 17 chars');
        return false;
    }
    console.log('Valid VIN');
    return true;
};

const split = function(vin) {
    const INDEXES = {
        MADE_IN_START: 0,
        MADE_IN_END: 2,
        MANUFACTURER_START: 0,
        MANUFACTURER_END: 3,
        DETAILS_START: 3,
        DETAILS_END: 8,
        SECURITY_CODE: 8,
        YEAR: 9,
        ASSEMBLY_PLANT: 10,
        SERIAL_NUMBER_START: 11
    };

    const rawInfo = {
        madeIn: vin.substring(INDEXES.MADE_IN_START,INDEXES.MADE_IN_END),
        manufacturer: vin.substring(INDEXES.MANUFACTURER_START,INDEXES.MANUFACTURER_END),
        details: vin.substring(INDEXES.DETAILS_START,INDEXES.DETAILS_END),
        securityCode: vin.charAt(INDEXES.SECURITY_CODE),
        year: vin.charAt(INDEXES.YEAR),
        assemblyPlant: vin.charAt(INDEXES.ASSEMBLY_PLANT),
        serialNumber: vin.substring(INDEXES.SERIAL_NUMBER_START)
    };
    console.log(rawInfo);
    return rawInfo;
};

const lookup = function(keyName, key, elements) {
    for (let i = 0; i < elements.length; i++) {
        let element = elements[i];

        if (element[keyName] == key)
            return element;
    }

    return '';
};

const get_country = (vin) => {
    let countryCode = split(vin).madeIn;
    console.log(countryCode);
    let country = lookup('code',countryCode, countries);
    console.log(country.name);
    return country.name;

}

const get_Manufacturer = (vin) => {
    let codeValues = split(vin);
    console.log(codeValues.manufacturer);
    let manufacturer = lookup('code', codeValues.manufacturer, manufacturers);
    console.log(manufacturer.name);
    return manufacturer.name;
};

const get_Restraint_System = (vin) => {
    let codeValues = split(vin);
};

const get_Series = (vin) => {
    let codeValues = split(vin);
};

const get_Body_Type = (vin) => {
    let codeValues = split(vin);
}

const get_Engine_Type = (vin) => {
    let codeValues = split(vin);
};

const get_Model_Year = (vin) => {
    let codeValues = split(vin);
};


const get_Plant = (vin) => {
    let codeValues = split(vin);
};


//tests
validate("4Y1SL65848Z411439");
// split("4Y1SL65848Z411439");
get_country("1NXBR32E77Z923602");
get_Manufacturer("1NXBR32E77Z923602");
