const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CompanySchema = Schema ({
    name: {
    	type:String,
    	required: "El nombre de la empresa es obligario"
    },
    permalink: String,
    crunchbase_url: String,
    homepage_url: String,
    blog_url: String,
    blog_feed_url: String,
    twitter_username: String,
    category_code: String,
    number_of_employees: Number,
    founded_year: Number,
    founded_month: Number,
    founded_day: Number,
    deadpooled_year: Number,
    tag_list: String,
    alias_list: String,
    email_address: String,
    phone_number: String,
    description: String,
    created_at: {
        $date: Date
    },
    updated_at: String,
    overview: String,
    image: {
    	available_sizes: [
            [
                [
                    Number,
                    Number
                ],
                String
            ]
        ]
    },
    products: {
    	type:Array,
        minlength: [0,"campo vacio"],
    	required: "La lista de productos es obligatoria"
    },
    relationships: {
    	type:Array,
        minlength: [0,"campo vacio"],
    	required: "La lista de miembros es obligatoria"
    },
    competitions: [
        {
            competitor: {
                name: String,
                permalink: String
            }
        }
    ],
    providerships: Array,
    total_money_raised: String,
    funding_rounds: [
        {
            id: Number,
            round_code: String,
            source_url: String,
            source_description: String,
            raised_amount: Number,
            raised_currency_code: String,
            funded_year: Number,
            funded_month: Number,
            funded_day: Number,
            investments: [
                {
                    company: String,
                    financial_org: {
                        name: String,
                        permalink: String
                    },
                    person: String
                }
            ]
        }
    ],
    investments: Array,
    acquisition: {
        price_amount: Number,
        price_currency_code: String,
        term_code: String,
        source_url: String,
        source_description: String,
        acquired_year: Number,
        acquired_month: Number,
        acquired_day: Number,
        acquiring_company: {
            name: String,
            permalink: String
        }
    },
    acquisitions: Array,
    offices: [
        {
            description: String,
            address1: String,
            address2: String,
            zip_code: String,
            city: String,
            state_code: String,
            country_code: String,
            latitude: Number,
            longitude: Number
        }
    ],
    milestones: [
        {
            id: Number,
            description: String,
            stoned_year: Number,
            stoned_month: Number,
            stoned_day: Number,
            source_url: String,
            source_text: String,
            source_description: String,
            stoneable_type: String,
            // stoned_value: null,
            // stoned_value_type: null,
            // stoned_acquirer: null,
            stoneable: {
                name: String,
               	permalink: String
            }
        }
    ],
    video_embeds: Array,
    screenshots: [
        {
            available_sizes: [
                [
                    [
                        Number,
                        Number
                    ],
                    String
                ]
            ],
            attribution: Array
        }
    ],
    external_links: [
        {
            external_url: String,
            title: String
        }
    ],
    partners: Array
})

module.exports = mongoose.model('Company', CompanySchema)

