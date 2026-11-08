// Entirely fictional demo records. City coordinates are approximate.
export const places = {
 lisbon:{name:'Lisbon, Portugal',lat:38.72,lon:-9.14}, porto:{name:'Porto, Portugal',lat:41.16,lon:-8.63},
 london:{name:'London, United Kingdom',lat:51.51,lon:-.13}, montreal:{name:'Montréal, Canada',lat:45.5,lon:-73.57},
 toronto:{name:'Toronto, Canada',lat:43.65,lon:-79.38}, vancouver:{name:'Vancouver, Canada',lat:49.28,lon:-123.12},
 buenos:{name:'Buenos Aires, Argentina',lat:-34.6,lon:-58.38}, melbourne:{name:'Melbourne, Australia',lat:-37.81,lon:144.96}
};
const make=(id,name,birth,death,branch,row,col,birthplace,bio,residences=[])=>({id,name,birth,death,branch,row,col,bio,events:[{type:'birth',year:birth,place:birthplace},...residences.map(([year,place])=>({type:'residence',year,place}))]});
export const people=[
 make('ines','Inês Vale',1882,1962,'Vale',0,0,'porto','A bookbinder who kept a small notebook of the cities she wanted to see. Her fictional story begins beside the Douro.',[[1910,'lisbon']]),
 make('tomas','Tomás Vale',1878,1956,'Vale',0,1,'lisbon','A railway draughtsman. The first connection in this demonstration family stretches from Porto to Lisbon.',[[1910,'lisbon']]),
 make('ada','Ada North',1888,1971,'North',0,2,'london','A teacher whose letters connect the North branch across the Atlantic.',[[1921,'montreal']]),
 make('owen','Owen North',1884,1968,'North',0,3,'london','A printer who moved to Montréal in 1921. A fictional life, created to explore how place and time intertwine.',[[1921,'montreal']]),
 make('rosa','Rosa Vale',1910,1992,'Vale',1,0,'lisbon','Inês and Tomás’s daughter. She crossed the Atlantic and made a new home in Montréal.',[[1932,'montreal'],[1947,'toronto']]),
 make('leo','Leo North',1915,1998,'North',1,1,'london','Ada and Owen’s son. His move to Toronto is recorded separately from his birthplace.',[[1921,'montreal'],[1947,'toronto']]),
 make('clara','Clara Vale',1918,2003,'Vale',1,2,'lisbon','Rosa’s younger sister. Her branch travelled south, building a life in Buenos Aires.',[[1940,'buenos']]),
 make('eva','Eva North',1948,null,'North',2,0,'toronto','Rosa and Leo’s daughter, a fictional architect. Her most recent recorded residence is Vancouver; that alone is not proof of where she lives today.',[[1974,'vancouver']]),
 make('sam','Sam North',1952,null,'North',2,1,'toronto','A gardener and collector of family stories. His fictional branch remains in Toronto.',[[1980,'toronto']]),
 make('lucas','Lucas Vale',1951,null,'Vale',2,2,'buenos','Clara’s son. His life adds a second ocean crossing to this demonstration.',[[1982,'melbourne']]),
 make('mira','Mira North',1981,null,'North',3,0,'vancouver','Eva’s daughter. The newest chapters connect Vancouver and London.',[[2008,'london'],[2023,'vancouver']]),
 make('noah','Noah North',1985,null,'North',3,1,'toronto','Sam’s son. His fictional city-level residence was recorded in Toronto in 2025.',[[2025,'toronto']]),
 make('luna','Luna Vale',1986,null,'Vale',3,2,'melbourne','Lucas’s daughter. She moved from Melbourne to Lisbon in 2016.',[[2016,'lisbon']]),
 make('elliot','Elliot North',2012,null,'North',4,0,'london','Mira’s child. This fictional record demonstrates the youngest generation without including real children’s data.',[[2023,'vancouver']])
];
export const relationships=[
 ['ines','tomas','partner'],['ada','owen','partner'],['rosa','leo','partner'],
 ['ines','rosa','parent'],['tomas','rosa','parent'],['ines','clara','parent'],['tomas','clara','parent'],
 ['ada','leo','parent'],['owen','leo','parent'],['rosa','eva','parent'],['leo','eva','parent'],
 ['rosa','sam','parent'],['leo','sam','parent'],['clara','lucas','parent'],['eva','mira','parent'],['sam','noah','parent'],['lucas','luna','parent'],['mira','elliot','parent']
];
