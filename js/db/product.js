var mongoose = require('mongoose');

MeasureSchema = mongoose.Schema({
    header: String,
    values: Array,
    precision: Number,
    order: Number
});

InformationSchema = mongoose.Schema({
    titleHtml: String,
    detailHtml: String,
    order: Number
});

ItemSchema = mongoose.Schema({
    key: String,
    titleHtml: String,
    detailHtml: String,
    backgroundImageUrl: String,
    imageUrl: String,
    imagesUrl: Array,
    order: Number,
    informations: [InformationSchema],
    measures: [MeasureSchema]
});

Product = mongoose.model('Product', mongoose.Schema({
    key: String,
    titleHtml: String,
    imageUrl: String,
    order: Number,
    items: [ItemSchema]
}));

exports.defaultValues = [
    new Product({
        key: 'caixas-de-agua',
        titleHtml: 'Caixas<br>de água',
        imageUrl: '/images/water-tanks.jpg',
        order: 0,
        items: [
            {
                key: 'item-1',
                titleHtml: 'Item 1',
                detailHtml: 'Detalhes do produto 1',
                backgroundImageUrl: '/images/tile-background.jpg',
                imageUrl: '/images/tile.jpg',
                imagesUrl: ['/images/tile-1.jpg', '/images/tile-2.jpg', '/images/tile-3.jpg', '/images/tile-4.jpg'],
                order: 0,
                informations: [
                    {
                        titleHtml: 'Título 1',
                        detailHtml: 'Recomendação muito importante sobre a montagem do item 1.<br>Preste atenção nos mínimos detalhes...',
                        order: 0
                    },
                    {
                        titleHtml: 'Título 2',
                        detailHtml: 'Recomendação muito importante sobre a montagem do item 2.<br>Preste atenção nos mínimos detalhes...',
                        order: 1
                    },
                    {
                        titleHtml: 'Título 3',
                        detailHtml: 'Recomendação muito importante sobre a montagem do item 3.<br>Preste atenção nos mínimos detalhes...',
                        order: 2
                    },
                    {
                        titleHtml: 'Título 4',
                        detailHtml: 'Recomendação muito importante sobre a montagem do item 4.<br>Preste atenção nos mínimos detalhes...',
                        order: 3
                    }
                ],
                measures: [
                    {
                        header: 'Comprimento (m)',
                        values: [1, 1.5, 2, 2.5],
                        precision: 2,
                        order: 0
                    },
                    {
                        header: 'Peso (kg)',
                        values: [2.25, 3.25, 4.25, 5.25],
                        precision: 2,
                        order: 1
                    },
                    {
                        header: 'Largura Útil (mm)',
                        values: [350, 400, 450, 500],
                        precision: 0,
                        order: 2
                    },
                    {
                        header: 'Espessura (mm)',
                        values: [4, 5, 5, 6],
                        precision: 0,
                        order: 3
                    }
                ]
            },
            {
                key: 'item-2',
                titleHtml: 'Item 2',
                detailHtml: 'Detalhes do produto 2',
                backgroundImageUrl: '/images/tile-background.jpg',
                imageUrl: '/images/tile.jpg',
                imagesUrl: ['/images/tile-1.jpg', '/images/tile-2.jpg', '/images/tile-3.jpg', '/images/tile-4.jpg'],
                order: 1,
                informations: [
                    {
                        titleHtml: 'Título 1',
                        detailHtml: 'Recomendação muito importante sobre a montagem do item 1.<br>Preste atenção nos mínimos detalhes...',
                        order: 0
                    },
                    {
                        titleHtml: 'Título 2',
                        detailHtml: 'Recomendação muito importante sobre a montagem do item 2.<br>Preste atenção nos mínimos detalhes...',
                        order: 1
                    },
                    {
                        titleHtml: 'Título 3',
                        detailHtml: 'Recomendação muito importante sobre a montagem do item 3.<br>Preste atenção nos mínimos detalhes...',
                        order: 2
                    },
                    {
                        titleHtml: 'Título 4',
                        detailHtml: 'Recomendação muito importante sobre a montagem do item 4.<br>Preste atenção nos mínimos detalhes...',
                        order: 3
                    }
                ],
                measures: [
                    {
                        header: 'Comprimento (m)',
                        values: [1, 1.5, 2, 2.5],
                        precision: 2,
                        order: 0
                    },
                    {
                        header: 'Peso (kg)',
                        values: [2.25, 3.25, 4.25, 5.25],
                        precision: 2,
                        order: 1
                    },
                    {
                        header: 'Largura Útil (mm)',
                        values: [350, 400, 450, 500],
                        precision: 0,
                        order: 2
                    },
                    {
                        header: 'Espessura (mm)',
                        values: [4, 5, 5, 6],
                        precision: 0,
                        order: 3
                    }
                ]
            }
        ]
    }),
    new Product({
        key: 'acabamentos-em-pvc',
        titleHtml: 'Acabamentos<br>em PVC',
        imageUrl: '/images/pvc-finishing-work.jpg',
        order: 1,
        items: [
            {
                key: 'item-3',
                titleHtml: 'Item 3',
                detailHtml: 'Detalhes do produto 3',
                backgroundImageUrl: '/images/tile-background.jpg',
                imageUrl: '/images/tile.jpg',
                imagesUrl: ['/images/tile-1.jpg', '/images/tile-2.jpg', '/images/tile-3.jpg', '/images/tile-4.jpg'],
                order: 0,
                informations: [
                    {
                        titleHtml: 'Título 1',
                        detailHtml: 'Recomendação muito importante sobre a montagem do item 1.<br>Preste atenção nos mínimos detalhes...',
                        order: 0
                    },
                    {
                        titleHtml: 'Título 2',
                        detailHtml: 'Recomendação muito importante sobre a montagem do item 2.<br>Preste atenção nos mínimos detalhes...',
                        order: 1
                    },
                    {
                        titleHtml: 'Título 3',
                        detailHtml: 'Recomendação muito importante sobre a montagem do item 3.<br>Preste atenção nos mínimos detalhes...',
                        order: 2
                    },
                    {
                        titleHtml: 'Título 4',
                        detailHtml: 'Recomendação muito importante sobre a montagem do item 4.<br>Preste atenção nos mínimos detalhes...',
                        order: 3
                    }
                ],
                measures: [
                    {
                        header: 'Comprimento (m)',
                        values: [1, 1.5, 2, 2.5],
                        precision: 2,
                        order: 0
                    },
                    {
                        header: 'Peso (kg)',
                        values: [2.25, 3.25, 4.25, 5.25],
                        precision: 2,
                        order: 1
                    },
                    {
                        header: 'Largura Útil (mm)',
                        values: [350, 400, 450, 500],
                        precision: 0,
                        order: 2
                    },
                    {
                        header: 'Espessura (mm)',
                        values: [4, 5, 5, 6],
                        precision: 0,
                        order: 3
                    }
                ]
            },
            {
                key: 'item-4',
                titleHtml: 'Item 4',
                detailHtml: 'Detalhes do produto 4',
                backgroundImageUrl: '/images/tile-background.jpg',
                imageUrl: '/images/tile.jpg',
                imagesUrl: ['/images/tile-1.jpg', '/images/tile-2.jpg', '/images/tile-3.jpg', '/images/tile-4.jpg'],
                order: 1,
                informations: [
                    {
                        titleHtml: 'Título 1',
                        detailHtml: 'Recomendação muito importante sobre a montagem do item 1.<br>Preste atenção nos mínimos detalhes...',
                        order: 0
                    },
                    {
                        titleHtml: 'Título 2',
                        detailHtml: 'Recomendação muito importante sobre a montagem do item 2.<br>Preste atenção nos mínimos detalhes...',
                        order: 1
                    },
                    {
                        titleHtml: 'Título 3',
                        detailHtml: 'Recomendação muito importante sobre a montagem do item 3.<br>Preste atenção nos mínimos detalhes...',
                        order: 2
                    },
                    {
                        titleHtml: 'Título 4',
                        detailHtml: 'Recomendação muito importante sobre a montagem do item 4.<br>Preste atenção nos mínimos detalhes...',
                        order: 3
                    }
                ],
                measures: [
                    {
                        header: 'Comprimento (m)',
                        values: [1, 1.5, 2, 2.5],
                        precision: 2,
                        order: 0
                    },
                    {
                        header: 'Peso (kg)',
                        values: [2.25, 3.25, 4.25, 5.25],
                        precision: 2,
                        order: 1
                    },
                    {
                        header: 'Largura Útil (mm)',
                        values: [350, 400, 450, 500],
                        precision: 0,
                        order: 2
                    },
                    {
                        header: 'Espessura (mm)',
                        values: [4, 5, 5, 6],
                        precision: 0,
                        order: 3
                    }
                ]
            }
        ]
    }),
new Product({
        key: 'acabamentos-em-pvc',
        titleHtml: 'Acabamentos<br>em PVC',
        imageUrl: '/images/pvc-finishing-work.jpg',
        order: 1,
        items: [
            {
                key: 'item-3',
                titleHtml: 'Item 3',
                detailHtml: 'Detalhes do produto 3',
                backgroundImageUrl: '/images/tile-background.jpg',
                imageUrl: '/images/tile.jpg',
                imagesUrl: ['/images/tile-1.jpg', '/images/tile-2.jpg', '/images/tile-3.jpg', '/images/tile-4.jpg'],
                order: 0,
                informations: [
                    {
                        titleHtml: 'Título 1',
                        detailHtml: 'Recomendação muito importante sobre a montagem do item 1.<br>Preste atenção nos mínimos detalhes...',
                        order: 0
                    },
                    {
                        titleHtml: 'Título 2',
                        detailHtml: 'Recomendação muito importante sobre a montagem do item 2.<br>Preste atenção nos mínimos detalhes...',
                        order: 1
                    },
                    {
                        titleHtml: 'Título 3',
                        detailHtml: 'Recomendação muito importante sobre a montagem do item 3.<br>Preste atenção nos mínimos detalhes...',
                        order: 2
                    },
                    {
                        titleHtml: 'Título 4',
                        detailHtml: 'Recomendação muito importante sobre a montagem do item 4.<br>Preste atenção nos mínimos detalhes...',
                        order: 3
                    }
                ],
                measures: [
                    {
                        header: 'Comprimento (m)',
                        values: [1, 1.5, 2, 2.5],
                        precision: 2,
                        order: 0
                    },
                    {
                        header: 'Peso (kg)',
                        values: [2.25, 3.25, 4.25, 5.25],
                        precision: 2,
                        order: 1
                    },
                    {
                        header: 'Largura Útil (mm)',
                        values: [350, 400, 450, 500],
                        precision: 0,
                        order: 2
                    },
                    {
                        header: 'Espessura (mm)',
                        values: [4, 5, 5, 6],
                        precision: 0,
                        order: 3
                    }
                ]
            },
            {
                key: 'item-4',
                titleHtml: 'Item 4',
                detailHtml: 'Detalhes do produto 4',
                backgroundImageUrl: '/images/tile-background.jpg',
                imageUrl: '/images/tile.jpg',
                imagesUrl: ['/images/tile-1.jpg', '/images/tile-2.jpg', '/images/tile-3.jpg', '/images/tile-4.jpg'],
                order: 1,
                informations: [
                    {
                        titleHtml: 'Título 1',
                        detailHtml: 'Recomendação muito importante sobre a montagem do item 1.<br>Preste atenção nos mínimos detalhes...',
                        order: 0
                    },
                    {
                        titleHtml: 'Título 2',
                        detailHtml: 'Recomendação muito importante sobre a montagem do item 2.<br>Preste atenção nos mínimos detalhes...',
                        order: 1
                    },
                    {
                        titleHtml: 'Título 3',
                        detailHtml: 'Recomendação muito importante sobre a montagem do item 3.<br>Preste atenção nos mínimos detalhes...',
                        order: 2
                    },
                    {
                        titleHtml: 'Título 4',
                        detailHtml: 'Recomendação muito importante sobre a montagem do item 4.<br>Preste atenção nos mínimos detalhes...',
                        order: 3
                    }
                ],
                measures: [
                    {
                        header: 'Comprimento (m)',
                        values: [1, 1.5, 2, 2.5],
                        precision: 2,
                        order: 0
                    },
                    {
                        header: 'Peso (kg)',
                        values: [2.25, 3.25, 4.25, 5.25],
                        precision: 2,
                        order: 1
                    },
                    {
                        header: 'Largura Útil (mm)',
                        values: [350, 400, 450, 500],
                        precision: 0,
                        order: 2
                    },
                    {
                        header: 'Espessura (mm)',
                        values: [4, 5, 5, 6],
                        precision: 0,
                        order: 3
                    }
                ]
            }
        ]
    }),
    new Product({
        key: 'coberturas',
        titleHtml: 'Coberturas',
        imageUrl: '/images/roof-tiles.jpg',
        order: 2,
        items: [
            {
                key: 'item-5',
                titleHtml: 'Item 5',
                detailHtml: 'Detalhes do produto 5',
                backgroundImageUrl: '/images/tile-background.jpg',
                imageUrl: '/images/tile.jpg',
                imagesUrl: ['/images/tile-1.jpg', '/images/tile-2.jpg', '/images/tile-3.jpg', '/images/tile-4.jpg'],
                order: 0,
                informations: [
                    {
                        titleHtml: 'Título 1',
                        detailHtml: 'Recomendação muito importante sobre a montagem do item 1.<br>Preste atenção nos mínimos detalhes...',
                        order: 0
                    },
                    {
                        titleHtml: 'Título 2',
                        detailHtml: 'Recomendação muito importante sobre a montagem do item 2.<br>Preste atenção nos mínimos detalhes...',
                        order: 1
                    },
                    {
                        titleHtml: 'Título 3',
                        detailHtml: 'Recomendação muito importante sobre a montagem do item 3.<br>Preste atenção nos mínimos detalhes...',
                        order: 2
                    },
                    {
                        titleHtml: 'Título 4',
                        detailHtml: 'Recomendação muito importante sobre a montagem do item 4.<br>Preste atenção nos mínimos detalhes...',
                        order: 3
                    }
                ],
                measures: [
                    {
                        header: 'Comprimento (m)',
                        values: [1, 1.5, 2, 2.5],
                        precision: 2,
                        order: 0
                    },
                    {
                        header: 'Peso (kg)',
                        values: [2.25, 3.25, 4.25, 5.25],
                        precision: 2,
                        order: 1
                    },
                    {
                        header: 'Largura Útil (mm)',
                        values: [350, 400, 450, 500],
                        precision: 0,
                        order: 2
                    },
                    {
                        header: 'Espessura (mm)',
                        values: [4, 5, 5, 6],
                        precision: 0,
                        order: 3
                    }
                ]
            },
            {
                key: 'item-6',
                titleHtml: 'Item 6',
                detailHtml: 'Detalhes do produto 6',
                backgroundImageUrl: '/images/tile-background.jpg',
                imageUrl: '/images/tile.jpg',
                imagesUrl: ['/images/tile-1.jpg', '/images/tile-2.jpg', '/images/tile-3.jpg', '/images/tile-4.jpg'],
                order: 1,
                informations: [
                    {
                        titleHtml: 'Título 1',
                        detailHtml: 'Recomendação muito importante sobre a montagem do item 1.<br>Preste atenção nos mínimos detalhes...',
                        order: 0
                    },
                    {
                        titleHtml: 'Título 2',
                        detailHtml: 'Recomendação muito importante sobre a montagem do item 2.<br>Preste atenção nos mínimos detalhes...',
                        order: 1
                    },
                    {
                        titleHtml: 'Título 3',
                        detailHtml: 'Recomendação muito importante sobre a montagem do item 3.<br>Preste atenção nos mínimos detalhes...',
                        order: 2
                    },
                    {
                        titleHtml: 'Título 4',
                        detailHtml: 'Recomendação muito importante sobre a montagem do item 4.<br>Preste atenção nos mínimos detalhes...',
                        order: 3
                    }
                ],
                measures: [
                    {
                        header: 'Comprimento (m)',
                        values: [1, 1.5, 2, 2.5],
                        precision: 2,
                        order: 0
                    },
                    {
                        header: 'Peso (kg)',
                        values: [2.25, 3.25, 4.25, 5.25],
                        precision: 2,
                        order: 1
                    },
                    {
                        header: 'Largura Útil (mm)',
                        values: [350, 400, 450, 500],
                        precision: 0,
                        order: 2
                    },
                    {
                        header: 'Espessura (mm)',
                        values: [4, 5, 5, 6],
                        precision: 0,
                        order: 3
                    }
                ]
            }
        ]
    }),
    new Product({
        key: 'tubos-e-conexoes',
        titleHtml: 'Tubos<br>e conexões',
        imageUrl: '/images/pipes-fittings.jpg',
        order: 3,
        items: [
            {
                key: 'item-7',
                titleHtml: 'Item 7',
                detailHtml: 'Detalhes do produto 7',
                backgroundImageUrl: '/images/tile-background.jpg',
                imageUrl: '/images/tile.jpg',
                imagesUrl: ['/images/tile-1.jpg', '/images/tile-2.jpg', '/images/tile-3.jpg', '/images/tile-4.jpg'],
                order: 0,
                informations: [
                    {
                        titleHtml: 'Título 1',
                        detailHtml: 'Recomendação muito importante sobre a montagem do item 1.<br>Preste atenção nos mínimos detalhes...',
                        order: 0
                    },
                    {
                        titleHtml: 'Título 2',
                        detailHtml: 'Recomendação muito importante sobre a montagem do item 2.<br>Preste atenção nos mínimos detalhes...',
                        order: 1
                    },
                    {
                        titleHtml: 'Título 3',
                        detailHtml: 'Recomendação muito importante sobre a montagem do item 3.<br>Preste atenção nos mínimos detalhes...',
                        order: 2
                    },
                    {
                        titleHtml: 'Título 4',
                        detailHtml: 'Recomendação muito importante sobre a montagem do item 4.<br>Preste atenção nos mínimos detalhes...',
                        order: 3
                    }
                ],
                measures: [
                    {
                        header: 'Comprimento (m)',
                        values: [1, 1.5, 2, 2.5],
                        precision: 2,
                        order: 0
                    },
                    {
                        header: 'Peso (kg)',
                        values: [2.25, 3.25, 4.25, 5.25],
                        precision: 2,
                        order: 1
                    },
                    {
                        header: 'Largura Útil (mm)',
                        values: [350, 400, 450, 500],
                        precision: 0,
                        order: 2
                    },
                    {
                        header: 'Espessura (mm)',
                        values: [4, 5, 5, 6],
                        precision: 0,
                        order: 3
                    }
                ]
            },
            {
                key: 'item-8',
                titleHtml: 'Item 8',
                detailHtml: 'Detalhes do produto 8',
                backgroundImageUrl: '/images/tile-background.jpg',
                imageUrl: '/images/tile.jpg',
                imagesUrl: ['/images/tile-1.jpg', '/images/tile-2.jpg', '/images/tile-3.jpg', '/images/tile-4.jpg'],
                order: 1,
                informations: [
                    {
                        titleHtml: 'Título 1',
                        detailHtml: 'Recomendação muito importante sobre a montagem do item 1.<br>Preste atenção nos mínimos detalhes...',
                        order: 0
                    },
                    {
                        titleHtml: 'Título 2',
                        detailHtml: 'Recomendação muito importante sobre a montagem do item 2.<br>Preste atenção nos mínimos detalhes...',
                        order: 1
                    },
                    {
                        titleHtml: 'Título 3',
                        detailHtml: 'Recomendação muito importante sobre a montagem do item 3.<br>Preste atenção nos mínimos detalhes...',
                        order: 2
                    },
                    {
                        titleHtml: 'Título 4',
                        detailHtml: 'Recomendação muito importante sobre a montagem do item 4.<br>Preste atenção nos mínimos detalhes...',
                        order: 3
                    }
                ],
                measures: [
                    {
                        header: 'Comprimento (m)',
                        values: [1, 1.5, 2, 2.5],
                        precision: 2,
                        order: 0
                    },
                    {
                        header: 'Peso (kg)',
                        values: [2.25, 3.25, 4.25, 5.25],
                        precision: 2,
                        order: 1
                    },
                    {
                        header: 'Largura Útil (mm)',
                        values: [350, 400, 450, 500],
                        precision: 0,
                        order: 2
                    },
                    {
                        header: 'Espessura (mm)',
                        values: [4, 5, 5, 6],
                        precision: 0,
                        order: 3
                    }
                ]
            }
        ]
    })
];

exports.Model = Product;