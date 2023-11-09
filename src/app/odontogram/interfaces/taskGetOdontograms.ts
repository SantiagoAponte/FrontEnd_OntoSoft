export interface taskGetOdontograms {
    id: String,
    date_register: Date,
    observation: string,
    tooth: [
        {
            id: string,
            num: number,
            ubicacion: string,
            typeProcess: [
                {
                    id: string,
                    name: string
                }
            ],
            faceTooth: [
                {
                    id: string,
                    description: string
                }
            ]
        },
    ]
}