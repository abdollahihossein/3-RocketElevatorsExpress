const data = require('./data')

module.exports = function (numberOfApartments, numberOfFloors, tier, res) {
    if (!(isNaN(numberOfApartments)) && !(isNaN(numberOfFloors))) {
        if ((Number.isInteger(Number(numberOfApartments))) && (Number.isInteger(Number(numberOfFloors)))) {
            if ((numberOfApartments > 0) && (numberOfFloors > 0)) {
                if ((tier == 'standard') || (tier == 'premium') || (tier == 'excelium')) {
                    let numberOfBanks = Math.ceil(numberOfFloors/20)
                    let numberOfApartPerFloor = Math.ceil(numberOfApartments/numberOfFloors)
                    let numberOfElevators = numberOfBanks * Math.ceil(numberOfApartPerFloor/6)
                    if (tier == 'standard') {
                        unitPrice = data.price.standard[0]
                        percentage = data.price.standard[1]
                    }
                    else if (tier == 'premium') {
                        unitPrice = data.price.premium[0]
                        percentage = data.price.premium[1]
                    }
                    else if (tier == 'excelium') {
                        unitPrice = data.price.excelium[0]
                        percentage = data.price.excelium[1]
                    }
                    let installationFee = percentage * numberOfElevators * unitPrice
                    let finalCost = installationFee + numberOfElevators * unitPrice
                    res.json({
                        number_of_elevators_required: `${numberOfElevators}`,
                        total_cost: `${finalCost}`
                    })
                }
                else res.send('Tier selection must be either standard or premium or excelium')
            }
            else res.send('Number of apartments and number of floors must be greater than zero')
        }
        else res.send('Number of apartments and number of floors must be integer')
    }
    else res.send('Number of apartments and number of floors must be number')
}