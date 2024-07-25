import { InvoiceSequelize } from "./models/invoice/Invoice"
import { FinancialInformationSequelize } from "./models/invoice/FinancialInformation"
import { InvoiceInfoSequelize } from "./models/invoice/InvoiceInfo"
import { DetailSequelize } from "./models/invoice/Detail"
import { AdditionalDetailSequelize } from "./models/invoice/AdditionalDetail"
import { TaxSequelize } from "./models/invoice/Tax"
import { ReimbursementSequelize } from "./models/invoice/Reimbursement"
import { TaxDetailSequelize } from "./models/invoice/reimbursement/TaxDetail"
import { ReimbursementCompensationSequelize } from "./models/invoice/reimbursement/ReimbursementCompensation"
import { WithHoldingSequelize } from "./models/invoice/WithHolding"

export const DbSequelize = (): Promise<void> => {
    return new Promise(async (resolve, reject) => {
        try {
            await InvoiceSequelize.sync()
            await FinancialInformationSequelize.sync()
            await InvoiceInfoSequelize.sync()
            await DetailSequelize.sync()
            await AdditionalDetailSequelize.sync()
            await TaxSequelize.sync()
            await ReimbursementSequelize.sync()
            await TaxDetailSequelize.sync()
            await ReimbursementCompensationSequelize.sync()
            await WithHoldingSequelize.sync()
            resolve()
        } catch (error) {
            reject(error)
        }
    })
}