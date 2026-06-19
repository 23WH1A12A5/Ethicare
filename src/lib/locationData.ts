// Phone country codes mapped to countries, with states/cities
export interface LocationData {
  name: string;
  code: string; // calling code
  states: { name: string; cities: string[] }[];
}

const locationDatabase: LocationData[] = [
  {
    name: "United States", code: "+1",
    states: [
      { name: "Alabama", cities: ["Birmingham", "Montgomery", "Huntsville", "Mobile", "Tuscaloosa"] },
      { name: "Alaska", cities: ["Anchorage", "Fairbanks", "Juneau", "Sitka", "Ketchikan"] },
      { name: "Arizona", cities: ["Phoenix", "Tucson", "Mesa", "Chandler", "Scottsdale", "Glendale", "Tempe"] },
      { name: "Arkansas", cities: ["Little Rock", "Fort Smith", "Fayetteville", "Springdale", "Jonesboro"] },
      { name: "California", cities: ["Los Angeles", "San Francisco", "San Diego", "San Jose", "Sacramento", "Fresno", "Oakland", "Long Beach", "Bakersfield", "Anaheim"] },
      { name: "Colorado", cities: ["Denver", "Colorado Springs", "Aurora", "Fort Collins", "Lakewood", "Boulder"] },
      { name: "Connecticut", cities: ["Bridgeport", "New Haven", "Hartford", "Stamford", "Waterbury"] },
      { name: "Delaware", cities: ["Wilmington", "Dover", "Newark", "Middletown", "Bear"] },
      { name: "Florida", cities: ["Miami", "Orlando", "Tampa", "Jacksonville", "St. Petersburg", "Fort Lauderdale", "Tallahassee"] },
      { name: "Georgia", cities: ["Atlanta", "Augusta", "Columbus", "Savannah", "Athens", "Macon"] },
      { name: "Hawaii", cities: ["Honolulu", "Pearl City", "Hilo", "Kailua", "Waipahu"] },
      { name: "Idaho", cities: ["Boise", "Meridian", "Nampa", "Idaho Falls", "Pocatello"] },
      { name: "Illinois", cities: ["Chicago", "Aurora", "Rockford", "Joliet", "Naperville", "Springfield"] },
      { name: "Indiana", cities: ["Indianapolis", "Fort Wayne", "Evansville", "South Bend", "Carmel"] },
      { name: "Iowa", cities: ["Des Moines", "Cedar Rapids", "Davenport", "Sioux City", "Iowa City"] },
      { name: "Kansas", cities: ["Wichita", "Overland Park", "Kansas City", "Olathe", "Topeka"] },
      { name: "Kentucky", cities: ["Louisville", "Lexington", "Bowling Green", "Owensboro", "Covington"] },
      { name: "Louisiana", cities: ["New Orleans", "Baton Rouge", "Shreveport", "Lafayette", "Lake Charles"] },
      { name: "Maine", cities: ["Portland", "Lewiston", "Bangor", "South Portland", "Auburn"] },
      { name: "Maryland", cities: ["Baltimore", "Columbia", "Germantown", "Silver Spring", "Waldorf"] },
      { name: "Massachusetts", cities: ["Boston", "Worcester", "Springfield", "Cambridge", "Lowell"] },
      { name: "Michigan", cities: ["Detroit", "Grand Rapids", "Warren", "Sterling Heights", "Ann Arbor", "Lansing"] },
      { name: "Minnesota", cities: ["Minneapolis", "Saint Paul", "Rochester", "Duluth", "Bloomington"] },
      { name: "Mississippi", cities: ["Jackson", "Gulfport", "Southaven", "Hattiesburg", "Biloxi"] },
      { name: "Missouri", cities: ["Kansas City", "St. Louis", "Springfield", "Columbia", "Independence"] },
      { name: "Montana", cities: ["Billings", "Missoula", "Great Falls", "Bozeman", "Helena"] },
      { name: "Nebraska", cities: ["Omaha", "Lincoln", "Bellevue", "Grand Island", "Kearney"] },
      { name: "Nevada", cities: ["Las Vegas", "Henderson", "Reno", "North Las Vegas", "Sparks"] },
      { name: "New Hampshire", cities: ["Manchester", "Nashua", "Concord", "Derry", "Dover"] },
      { name: "New Jersey", cities: ["Newark", "Jersey City", "Paterson", "Elizabeth", "Edison", "Trenton"] },
      { name: "New Mexico", cities: ["Albuquerque", "Las Cruces", "Rio Rancho", "Santa Fe", "Roswell"] },
      { name: "New York", cities: ["New York City", "Buffalo", "Rochester", "Yonkers", "Syracuse", "Albany"] },
      { name: "North Carolina", cities: ["Charlotte", "Raleigh", "Greensboro", "Durham", "Winston-Salem", "Fayetteville"] },
      { name: "North Dakota", cities: ["Fargo", "Bismarck", "Grand Forks", "Minot", "West Fargo"] },
      { name: "Ohio", cities: ["Columbus", "Cleveland", "Cincinnati", "Toledo", "Akron", "Dayton"] },
      { name: "Oklahoma", cities: ["Oklahoma City", "Tulsa", "Norman", "Broken Arrow", "Edmond"] },
      { name: "Oregon", cities: ["Portland", "Salem", "Eugene", "Gresham", "Hillsboro", "Bend"] },
      { name: "Pennsylvania", cities: ["Philadelphia", "Pittsburgh", "Allentown", "Erie", "Reading", "Scranton"] },
      { name: "Rhode Island", cities: ["Providence", "Warwick", "Cranston", "Pawtucket", "East Providence"] },
      { name: "South Carolina", cities: ["Charleston", "Columbia", "North Charleston", "Mount Pleasant", "Greenville"] },
      { name: "South Dakota", cities: ["Sioux Falls", "Rapid City", "Aberdeen", "Brookings", "Watertown"] },
      { name: "Tennessee", cities: ["Nashville", "Memphis", "Knoxville", "Chattanooga", "Clarksville"] },
      { name: "Texas", cities: ["Houston", "San Antonio", "Dallas", "Austin", "Fort Worth", "El Paso", "Arlington", "Plano"] },
      { name: "Utah", cities: ["Salt Lake City", "West Valley City", "Provo", "West Jordan", "Orem", "Sandy"] },
      { name: "Vermont", cities: ["Burlington", "South Burlington", "Rutland", "Barre", "Montpelier"] },
      { name: "Virginia", cities: ["Virginia Beach", "Norfolk", "Chesapeake", "Richmond", "Newport News", "Alexandria"] },
      { name: "Washington", cities: ["Seattle", "Spokane", "Tacoma", "Vancouver", "Bellevue", "Kent"] },
      { name: "West Virginia", cities: ["Charleston", "Huntington", "Morgantown", "Parkersburg", "Wheeling"] },
      { name: "Wisconsin", cities: ["Milwaukee", "Madison", "Green Bay", "Kenosha", "Racine"] },
      { name: "Wyoming", cities: ["Cheyenne", "Casper", "Laramie", "Gillette", "Rock Springs"] },
    ],
  },
  {
    name: "India", code: "+91",
    states: [
      { name: "Andhra Pradesh", cities: ["Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Tirupati", "Kakinada"] },
      { name: "Arunachal Pradesh", cities: ["Itanagar", "Naharlagun", "Pasighat", "Tawang", "Ziro"] },
      { name: "Assam", cities: ["Guwahati", "Silchar", "Dibrugarh", "Jorhat", "Nagaon", "Tezpur"] },
      { name: "Bihar", cities: ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur", "Darbhanga", "Purnia"] },
      { name: "Chhattisgarh", cities: ["Raipur", "Bhilai", "Bilaspur", "Korba", "Durg", "Rajnandgaon"] },
      { name: "Goa", cities: ["Panaji", "Margao", "Vasco da Gama", "Mapusa", "Ponda"] },
      { name: "Gujarat", cities: ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Gandhinagar", "Bhavnagar", "Jamnagar"] },
      { name: "Haryana", cities: ["Gurugram", "Faridabad", "Panipat", "Ambala", "Karnal", "Hisar"] },
      { name: "Himachal Pradesh", cities: ["Shimla", "Dharamshala", "Manali", "Solan", "Mandi", "Kullu"] },
      { name: "Jharkhand", cities: ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro", "Deoghar", "Hazaribagh"] },
      { name: "Karnataka", cities: ["Bengaluru", "Mysuru", "Hubli", "Mangaluru", "Belgaum", "Shimoga"] },
      { name: "Kerala", cities: ["Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur", "Kannur", "Kollam"] },
      { name: "Madhya Pradesh", cities: ["Bhopal", "Indore", "Jabalpur", "Gwalior", "Ujjain", "Sagar"] },
      { name: "Maharashtra", cities: ["Mumbai", "Pune", "Nagpur", "Thane", "Nashik", "Aurangabad", "Solapur"] },
      { name: "Manipur", cities: ["Imphal", "Thoubal", "Bishnupur", "Churachandpur", "Kakching"] },
      { name: "Meghalaya", cities: ["Shillong", "Tura", "Jowai", "Nongstoin", "Williamnagar"] },
      { name: "Mizoram", cities: ["Aizawl", "Lunglei", "Champhai", "Serchhip", "Kolasib"] },
      { name: "Nagaland", cities: ["Kohima", "Dimapur", "Mokokchung", "Tuensang", "Wokha"] },
      { name: "Odisha", cities: ["Bhubaneswar", "Cuttack", "Rourkela", "Berhampur", "Sambalpur", "Puri"] },
      { name: "Punjab", cities: ["Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda", "Mohali"] },
      { name: "Rajasthan", cities: ["Jaipur", "Jodhpur", "Udaipur", "Kota", "Bikaner", "Ajmer", "Alwar"] },
      { name: "Sikkim", cities: ["Gangtok", "Namchi", "Gyalshing", "Mangan", "Rangpo"] },
      { name: "Tamil Nadu", cities: ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem", "Tirunelveli", "Erode"] },
      { name: "Telangana", cities: ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar", "Khammam", "Ramagundam"] },
      { name: "Tripura", cities: ["Agartala", "Udaipur", "Dharmanagar", "Kailasahar", "Belonia"] },
      { name: "Uttar Pradesh", cities: ["Lucknow", "Kanpur", "Agra", "Varanasi", "Noida", "Ghaziabad", "Meerut", "Allahabad"] },
      { name: "Uttarakhand", cities: ["Dehradun", "Haridwar", "Roorkee", "Haldwani", "Rishikesh", "Nainital"] },
      { name: "West Bengal", cities: ["Kolkata", "Howrah", "Asansol", "Siliguri", "Durgapur", "Darjeeling"] },
      { name: "Delhi", cities: ["New Delhi", "Delhi", "Dwarka", "Rohini", "Saket"] },
    ],
  },
  {
    name: "United Kingdom", code: "+44",
    states: [
      { name: "England", cities: ["London", "Manchester", "Birmingham", "Liverpool", "Leeds", "Bristol", "Sheffield", "Newcastle", "Nottingham", "Leicester"] },
      { name: "Scotland", cities: ["Edinburgh", "Glasgow", "Aberdeen", "Dundee", "Inverness", "Stirling"] },
      { name: "Wales", cities: ["Cardiff", "Swansea", "Newport", "Bangor", "Wrexham"] },
      { name: "Northern Ireland", cities: ["Belfast", "Derry", "Lisburn", "Newry", "Bangor"] },
    ],
  },
  {
    name: "Canada", code: "+1",
    states: [
      { name: "Ontario", cities: ["Toronto", "Ottawa", "Mississauga", "Brampton", "Hamilton", "London", "Markham"] },
      { name: "Quebec", cities: ["Montreal", "Quebec City", "Laval", "Gatineau", "Longueuil", "Sherbrooke"] },
      { name: "British Columbia", cities: ["Vancouver", "Surrey", "Burnaby", "Richmond", "Victoria", "Kelowna"] },
      { name: "Alberta", cities: ["Calgary", "Edmonton", "Red Deer", "Lethbridge", "Medicine Hat"] },
      { name: "Manitoba", cities: ["Winnipeg", "Brandon", "Steinbach", "Thompson", "Portage la Prairie"] },
      { name: "Saskatchewan", cities: ["Saskatoon", "Regina", "Prince Albert", "Moose Jaw", "Swift Current"] },
      { name: "Nova Scotia", cities: ["Halifax", "Dartmouth", "Sydney", "Truro", "New Glasgow"] },
      { name: "New Brunswick", cities: ["Moncton", "Saint John", "Fredericton", "Dieppe", "Miramichi"] },
      { name: "Newfoundland and Labrador", cities: ["St. John's", "Mount Pearl", "Corner Brook", "Conception Bay South"] },
      { name: "Prince Edward Island", cities: ["Charlottetown", "Summerside", "Stratford", "Cornwall"] },
    ],
  },
  {
    name: "Australia", code: "+61",
    states: [
      { name: "New South Wales", cities: ["Sydney", "Newcastle", "Wollongong", "Central Coast", "Coffs Harbour"] },
      { name: "Victoria", cities: ["Melbourne", "Geelong", "Ballarat", "Bendigo", "Shepparton"] },
      { name: "Queensland", cities: ["Brisbane", "Gold Coast", "Sunshine Coast", "Townsville", "Cairns", "Toowoomba"] },
      { name: "Western Australia", cities: ["Perth", "Mandurah", "Bunbury", "Geraldton", "Kalgoorlie"] },
      { name: "South Australia", cities: ["Adelaide", "Mount Gambier", "Whyalla", "Murray Bridge", "Port Augusta"] },
      { name: "Tasmania", cities: ["Hobart", "Launceston", "Devonport", "Burnie", "Kingston"] },
      { name: "Northern Territory", cities: ["Darwin", "Alice Springs", "Palmerston", "Katherine"] },
      { name: "Australian Capital Territory", cities: ["Canberra", "Queanbeyan"] },
    ],
  },
  {
    name: "Germany", code: "+49",
    states: [
      { name: "Bavaria", cities: ["Munich", "Nuremberg", "Augsburg", "Regensburg", "Würzburg"] },
      { name: "North Rhine-Westphalia", cities: ["Cologne", "Düsseldorf", "Dortmund", "Essen", "Duisburg", "Bonn"] },
      { name: "Baden-Württemberg", cities: ["Stuttgart", "Karlsruhe", "Mannheim", "Freiburg", "Heidelberg"] },
      { name: "Lower Saxony", cities: ["Hanover", "Braunschweig", "Oldenburg", "Osnabrück", "Wolfsburg"] },
      { name: "Hesse", cities: ["Frankfurt", "Wiesbaden", "Kassel", "Darmstadt", "Offenbach"] },
      { name: "Saxony", cities: ["Leipzig", "Dresden", "Chemnitz", "Zwickau", "Plauen"] },
      { name: "Berlin", cities: ["Berlin"] },
      { name: "Hamburg", cities: ["Hamburg"] },
      { name: "Brandenburg", cities: ["Potsdam", "Cottbus", "Frankfurt (Oder)", "Brandenburg an der Havel"] },
    ],
  },
  {
    name: "France", code: "+33",
    states: [
      { name: "Île-de-France", cities: ["Paris", "Boulogne-Billancourt", "Saint-Denis", "Versailles", "Nanterre"] },
      { name: "Provence-Alpes-Côte d'Azur", cities: ["Marseille", "Nice", "Toulon", "Aix-en-Provence", "Cannes"] },
      { name: "Auvergne-Rhône-Alpes", cities: ["Lyon", "Grenoble", "Saint-Étienne", "Clermont-Ferrand", "Annecy"] },
      { name: "Nouvelle-Aquitaine", cities: ["Bordeaux", "Limoges", "Poitiers", "La Rochelle", "Pau"] },
      { name: "Occitanie", cities: ["Toulouse", "Montpellier", "Nîmes", "Perpignan", "Béziers"] },
      { name: "Hauts-de-France", cities: ["Lille", "Amiens", "Roubaix", "Tourcoing", "Dunkirk"] },
      { name: "Grand Est", cities: ["Strasbourg", "Reims", "Metz", "Mulhouse", "Nancy"] },
      { name: "Brittany", cities: ["Rennes", "Brest", "Quimper", "Lorient", "Saint-Malo"] },
    ],
  },
  {
    name: "Japan", code: "+81",
    states: [
      { name: "Tokyo", cities: ["Tokyo", "Shibuya", "Shinjuku", "Minato", "Chiyoda"] },
      { name: "Osaka", cities: ["Osaka", "Sakai", "Higashiosaka", "Toyonaka", "Suita"] },
      { name: "Kanagawa", cities: ["Yokohama", "Kawasaki", "Sagamihara", "Fujisawa", "Kamakura"] },
      { name: "Aichi", cities: ["Nagoya", "Toyota", "Okazaki", "Toyohashi", "Ichinomiya"] },
      { name: "Hokkaido", cities: ["Sapporo", "Asahikawa", "Hakodate", "Obihiro", "Kushiro"] },
      { name: "Fukuoka", cities: ["Fukuoka", "Kitakyushu", "Kurume", "Omuta", "Iizuka"] },
      { name: "Kyoto", cities: ["Kyoto", "Uji", "Kameoka", "Maizuru", "Nagaokakyo"] },
      { name: "Hyogo", cities: ["Kobe", "Himeji", "Nishinomiya", "Amagasaki", "Akashi"] },
    ],
  },
  {
    name: "Brazil", code: "+55",
    states: [
      { name: "São Paulo", cities: ["São Paulo", "Campinas", "Guarulhos", "Santos", "São Bernardo do Campo"] },
      { name: "Rio de Janeiro", cities: ["Rio de Janeiro", "Niterói", "Petrópolis", "Volta Redonda", "Duque de Caxias"] },
      { name: "Minas Gerais", cities: ["Belo Horizonte", "Uberlândia", "Juiz de Fora", "Contagem", "Betim"] },
      { name: "Bahia", cities: ["Salvador", "Feira de Santana", "Vitória da Conquista", "Ilhéus", "Camaçari"] },
      { name: "Paraná", cities: ["Curitiba", "Londrina", "Maringá", "Ponta Grossa", "Cascavel"] },
      { name: "Rio Grande do Sul", cities: ["Porto Alegre", "Caxias do Sul", "Pelotas", "Canoas", "Santa Maria"] },
      { name: "Pernambuco", cities: ["Recife", "Jaboatão dos Guararapes", "Olinda", "Caruaru", "Petrolina"] },
      { name: "Ceará", cities: ["Fortaleza", "Caucaia", "Juazeiro do Norte", "Maracanaú", "Sobral"] },
    ],
  },
  {
    name: "China", code: "+86",
    states: [
      { name: "Beijing", cities: ["Beijing"] },
      { name: "Shanghai", cities: ["Shanghai"] },
      { name: "Guangdong", cities: ["Guangzhou", "Shenzhen", "Dongguan", "Foshan", "Zhuhai"] },
      { name: "Zhejiang", cities: ["Hangzhou", "Ningbo", "Wenzhou", "Jinhua", "Shaoxing"] },
      { name: "Jiangsu", cities: ["Nanjing", "Suzhou", "Wuxi", "Changzhou", "Nantong"] },
      { name: "Sichuan", cities: ["Chengdu", "Mianyang", "Deyang", "Nanchong", "Leshan"] },
      { name: "Hubei", cities: ["Wuhan", "Yichang", "Xiangyang", "Jingzhou", "Huangshi"] },
      { name: "Shandong", cities: ["Jinan", "Qingdao", "Yantai", "Weifang", "Zibo"] },
    ],
  },
  {
    name: "South Korea", code: "+82",
    states: [
      { name: "Seoul", cities: ["Seoul"] },
      { name: "Busan", cities: ["Busan"] },
      { name: "Gyeonggi", cities: ["Suwon", "Seongnam", "Goyang", "Yongin", "Bucheon", "Ansan"] },
      { name: "Incheon", cities: ["Incheon"] },
      { name: "Daegu", cities: ["Daegu"] },
      { name: "Daejeon", cities: ["Daejeon"] },
      { name: "Gwangju", cities: ["Gwangju"] },
    ],
  },
  {
    name: "Mexico", code: "+52",
    states: [
      { name: "Mexico City", cities: ["Mexico City"] },
      { name: "Jalisco", cities: ["Guadalajara", "Zapopan", "Tlaquepaque", "Tonalá", "Puerto Vallarta"] },
      { name: "Nuevo León", cities: ["Monterrey", "Guadalupe", "San Nicolás", "Apodaca", "Santa Catarina"] },
      { name: "Puebla", cities: ["Puebla", "Tehuacán", "San Martín Texmelucan", "Atlixco"] },
      { name: "Guanajuato", cities: ["León", "Irapuato", "Celaya", "Salamanca", "Guanajuato"] },
      { name: "Veracruz", cities: ["Veracruz", "Xalapa", "Coatzacoalcos", "Córdoba", "Orizaba"] },
    ],
  },
  {
    name: "Russia", code: "+7",
    states: [
      { name: "Moscow", cities: ["Moscow"] },
      { name: "Saint Petersburg", cities: ["Saint Petersburg"] },
      { name: "Novosibirsk Oblast", cities: ["Novosibirsk", "Berdsk", "Iskitim"] },
      { name: "Sverdlovsk Oblast", cities: ["Yekaterinburg", "Nizhny Tagil", "Kamensk-Uralsky"] },
      { name: "Tatarstan", cities: ["Kazan", "Naberezhnye Chelny", "Nizhnekamsk", "Almetyevsk"] },
    ],
  },
  {
    name: "South Africa", code: "+27",
    states: [
      { name: "Gauteng", cities: ["Johannesburg", "Pretoria", "Soweto", "Benoni", "Boksburg"] },
      { name: "Western Cape", cities: ["Cape Town", "Stellenbosch", "Paarl", "George", "Knysna"] },
      { name: "KwaZulu-Natal", cities: ["Durban", "Pietermaritzburg", "Richards Bay", "Newcastle"] },
      { name: "Eastern Cape", cities: ["Port Elizabeth", "East London", "Mthatha", "Grahamstown"] },
      { name: "Free State", cities: ["Bloemfontein", "Welkom", "Kroonstad", "Bethlehem"] },
    ],
  },
  {
    name: "Nigeria", code: "+234",
    states: [
      { name: "Lagos", cities: ["Lagos", "Ikeja", "Lekki", "Victoria Island", "Surulere"] },
      { name: "Abuja (FCT)", cities: ["Abuja", "Gwagwalada", "Kuje", "Bwari"] },
      { name: "Kano", cities: ["Kano", "Wudil", "Bichi", "Gwarzo"] },
      { name: "Rivers", cities: ["Port Harcourt", "Obio-Akpor", "Bonny", "Degema"] },
      { name: "Oyo", cities: ["Ibadan", "Ogbomoso", "Oyo", "Iseyin"] },
      { name: "Kaduna", cities: ["Kaduna", "Zaria", "Kafanchan", "Kagoro"] },
    ],
  },
  {
    name: "Egypt", code: "+20",
    states: [
      { name: "Cairo", cities: ["Cairo", "Giza", "Helwan", "6th of October City"] },
      { name: "Alexandria", cities: ["Alexandria", "Borg El Arab"] },
      { name: "Luxor", cities: ["Luxor"] },
      { name: "Aswan", cities: ["Aswan"] },
      { name: "Red Sea", cities: ["Hurghada", "Sharm El Sheikh", "Marsa Alam"] },
    ],
  },
  {
    name: "United Arab Emirates", code: "+971",
    states: [
      { name: "Dubai", cities: ["Dubai", "Jebel Ali", "Dubai Marina"] },
      { name: "Abu Dhabi", cities: ["Abu Dhabi", "Al Ain", "Madinat Zayed"] },
      { name: "Sharjah", cities: ["Sharjah", "Khor Fakkan"] },
      { name: "Ajman", cities: ["Ajman"] },
      { name: "Ras Al Khaimah", cities: ["Ras Al Khaimah"] },
    ],
  },
  {
    name: "Saudi Arabia", code: "+966",
    states: [
      { name: "Riyadh", cities: ["Riyadh", "Kharj", "Dawadmi"] },
      { name: "Makkah", cities: ["Mecca", "Jeddah", "Taif"] },
      { name: "Madinah", cities: ["Medina", "Yanbu"] },
      { name: "Eastern Province", cities: ["Dammam", "Dhahran", "Khobar", "Jubail"] },
    ],
  },
  {
    name: "Pakistan", code: "+92",
    states: [
      { name: "Punjab", cities: ["Lahore", "Faisalabad", "Rawalpindi", "Multan", "Gujranwala", "Sialkot"] },
      { name: "Sindh", cities: ["Karachi", "Hyderabad", "Sukkur", "Larkana", "Nawabshah"] },
      { name: "Khyber Pakhtunkhwa", cities: ["Peshawar", "Abbottabad", "Mardan", "Swat", "Kohat"] },
      { name: "Balochistan", cities: ["Quetta", "Gwadar", "Turbat", "Khuzdar"] },
      { name: "Islamabad", cities: ["Islamabad"] },
    ],
  },
  {
    name: "Bangladesh", code: "+880",
    states: [
      { name: "Dhaka", cities: ["Dhaka", "Gazipur", "Narayanganj", "Tangail"] },
      { name: "Chittagong", cities: ["Chittagong", "Comilla", "Cox's Bazar", "Rangamati"] },
      { name: "Rajshahi", cities: ["Rajshahi", "Bogra", "Pabna", "Naogaon"] },
      { name: "Khulna", cities: ["Khulna", "Jessore", "Satkhira", "Bagerhat"] },
      { name: "Sylhet", cities: ["Sylhet", "Habiganj", "Moulvibazar"] },
    ],
  },
  {
    name: "Indonesia", code: "+62",
    states: [
      { name: "Jakarta", cities: ["Jakarta"] },
      { name: "West Java", cities: ["Bandung", "Bekasi", "Depok", "Bogor", "Cirebon"] },
      { name: "East Java", cities: ["Surabaya", "Malang", "Sidoarjo", "Kediri"] },
      { name: "Central Java", cities: ["Semarang", "Solo", "Magelang", "Pekalongan"] },
      { name: "Bali", cities: ["Denpasar", "Ubud", "Kuta", "Seminyak"] },
    ],
  },
  {
    name: "Turkey", code: "+90",
    states: [
      { name: "Istanbul", cities: ["Istanbul"] },
      { name: "Ankara", cities: ["Ankara"] },
      { name: "Izmir", cities: ["Izmir", "Karşıyaka", "Bornova"] },
      { name: "Antalya", cities: ["Antalya", "Alanya", "Manavgat", "Side"] },
      { name: "Bursa", cities: ["Bursa", "İnegöl", "Mudanya"] },
    ],
  },
  {
    name: "Italy", code: "+39",
    states: [
      { name: "Lombardy", cities: ["Milan", "Bergamo", "Brescia", "Como", "Monza"] },
      { name: "Lazio", cities: ["Rome", "Latina", "Viterbo", "Frosinone"] },
      { name: "Campania", cities: ["Naples", "Salerno", "Caserta", "Avellino"] },
      { name: "Tuscany", cities: ["Florence", "Pisa", "Livorno", "Siena", "Arezzo"] },
      { name: "Veneto", cities: ["Venice", "Verona", "Padua", "Vicenza", "Treviso"] },
      { name: "Sicily", cities: ["Palermo", "Catania", "Messina", "Syracuse"] },
    ],
  },
  {
    name: "Spain", code: "+34",
    states: [
      { name: "Madrid", cities: ["Madrid", "Alcalá de Henares", "Getafe", "Leganés"] },
      { name: "Catalonia", cities: ["Barcelona", "Girona", "Tarragona", "Lleida"] },
      { name: "Andalusia", cities: ["Seville", "Málaga", "Granada", "Córdoba", "Cádiz"] },
      { name: "Valencia", cities: ["Valencia", "Alicante", "Elche", "Castellón"] },
      { name: "Basque Country", cities: ["Bilbao", "San Sebastián", "Vitoria-Gasteiz"] },
    ],
  },
  {
    name: "Netherlands", code: "+31",
    states: [
      { name: "North Holland", cities: ["Amsterdam", "Haarlem", "Zaandam", "Hilversum"] },
      { name: "South Holland", cities: ["Rotterdam", "The Hague", "Leiden", "Delft", "Dordrecht"] },
      { name: "Utrecht", cities: ["Utrecht", "Amersfoort", "Veenendaal"] },
      { name: "North Brabant", cities: ["Eindhoven", "Tilburg", "Breda", "'s-Hertogenbosch"] },
    ],
  },
  {
    name: "Sweden", code: "+46",
    states: [
      { name: "Stockholm", cities: ["Stockholm", "Solna", "Sundbyberg"] },
      { name: "Västra Götaland", cities: ["Gothenburg", "Borås", "Trollhättan"] },
      { name: "Skåne", cities: ["Malmö", "Helsingborg", "Lund"] },
      { name: "Uppsala", cities: ["Uppsala", "Enköping"] },
    ],
  },
  {
    name: "Singapore", code: "+65",
    states: [
      { name: "Singapore", cities: ["Singapore"] },
    ],
  },
  {
    name: "Malaysia", code: "+60",
    states: [
      { name: "Kuala Lumpur", cities: ["Kuala Lumpur"] },
      { name: "Selangor", cities: ["Shah Alam", "Petaling Jaya", "Subang Jaya", "Klang"] },
      { name: "Penang", cities: ["George Town", "Butterworth", "Bayan Lepas"] },
      { name: "Johor", cities: ["Johor Bahru", "Iskandar Puteri", "Batu Pahat"] },
      { name: "Sabah", cities: ["Kota Kinabalu", "Sandakan", "Tawau"] },
    ],
  },
  {
    name: "Philippines", code: "+63",
    states: [
      { name: "Metro Manila", cities: ["Manila", "Quezon City", "Makati", "Taguig", "Pasig"] },
      { name: "Cebu", cities: ["Cebu City", "Mandaue", "Lapu-Lapu"] },
      { name: "Davao", cities: ["Davao City", "Tagum", "Panabo"] },
      { name: "Calabarzon", cities: ["Calamba", "Antipolo", "Batangas City", "Lucena"] },
    ],
  },
  {
    name: "Thailand", code: "+66",
    states: [
      { name: "Bangkok", cities: ["Bangkok"] },
      { name: "Chiang Mai", cities: ["Chiang Mai", "Chiang Rai"] },
      { name: "Phuket", cities: ["Phuket"] },
      { name: "Chonburi", cities: ["Pattaya", "Chonburi", "Si Racha"] },
      { name: "Nakhon Ratchasima", cities: ["Nakhon Ratchasima", "Pak Chong"] },
    ],
  },
  {
    name: "Vietnam", code: "+84",
    states: [
      { name: "Hanoi", cities: ["Hanoi"] },
      { name: "Ho Chi Minh City", cities: ["Ho Chi Minh City"] },
      { name: "Da Nang", cities: ["Da Nang"] },
      { name: "Hai Phong", cities: ["Hai Phong"] },
      { name: "Can Tho", cities: ["Can Tho"] },
    ],
  },
  {
    name: "Kenya", code: "+254",
    states: [
      { name: "Nairobi", cities: ["Nairobi"] },
      { name: "Mombasa", cities: ["Mombasa"] },
      { name: "Kisumu", cities: ["Kisumu"] },
      { name: "Nakuru", cities: ["Nakuru"] },
      { name: "Eldoret", cities: ["Eldoret"] },
    ],
  },
  {
    name: "Ghana", code: "+233",
    states: [
      { name: "Greater Accra", cities: ["Accra", "Tema", "Madina"] },
      { name: "Ashanti", cities: ["Kumasi", "Obuasi", "Ejisu"] },
      { name: "Western", cities: ["Takoradi", "Sekondi"] },
      { name: "Northern", cities: ["Tamale", "Yendi"] },
    ],
  },
  {
    name: "Argentina", code: "+54",
    states: [
      { name: "Buenos Aires", cities: ["Buenos Aires", "La Plata", "Mar del Plata", "Bahía Blanca"] },
      { name: "Córdoba", cities: ["Córdoba", "Villa María", "Río Cuarto"] },
      { name: "Santa Fe", cities: ["Rosario", "Santa Fe", "Rafaela"] },
      { name: "Mendoza", cities: ["Mendoza", "San Rafael", "Godoy Cruz"] },
    ],
  },
  {
    name: "Colombia", code: "+57",
    states: [
      { name: "Bogotá", cities: ["Bogotá"] },
      { name: "Antioquia", cities: ["Medellín", "Envigado", "Bello", "Itagüí"] },
      { name: "Valle del Cauca", cities: ["Cali", "Buenaventura", "Palmira"] },
      { name: "Atlántico", cities: ["Barranquilla", "Soledad", "Malambo"] },
    ],
  },
  {
    name: "Chile", code: "+56",
    states: [
      { name: "Santiago Metropolitan", cities: ["Santiago", "Puente Alto", "Maipú", "La Florida"] },
      { name: "Valparaíso", cities: ["Valparaíso", "Viña del Mar", "Quilpué"] },
      { name: "Biobío", cities: ["Concepción", "Talcahuano", "Chillán"] },
    ],
  },
  {
    name: "New Zealand", code: "+64",
    states: [
      { name: "Auckland", cities: ["Auckland", "Manukau", "North Shore"] },
      { name: "Wellington", cities: ["Wellington", "Lower Hutt", "Upper Hutt", "Porirua"] },
      { name: "Canterbury", cities: ["Christchurch", "Timaru", "Ashburton"] },
      { name: "Waikato", cities: ["Hamilton", "Tauranga", "Rotorua"] },
    ],
  },
  {
    name: "Israel", code: "+972",
    states: [
      { name: "Tel Aviv", cities: ["Tel Aviv", "Ramat Gan", "Bnei Brak", "Holon", "Bat Yam"] },
      { name: "Jerusalem", cities: ["Jerusalem"] },
      { name: "Haifa", cities: ["Haifa", "Krayot"] },
      { name: "Central", cities: ["Rishon LeZion", "Petah Tikva", "Netanya", "Ashdod"] },
    ],
  },
  {
    name: "Poland", code: "+48",
    states: [
      { name: "Masovia", cities: ["Warsaw", "Radom", "Płock"] },
      { name: "Lesser Poland", cities: ["Kraków", "Tarnów", "Nowy Sącz"] },
      { name: "Silesia", cities: ["Katowice", "Gliwice", "Zabrze", "Bytom"] },
      { name: "Greater Poland", cities: ["Poznań", "Kalisz", "Konin"] },
      { name: "Lower Silesia", cities: ["Wrocław", "Wałbrzych", "Legnica"] },
    ],
  },
  {
    name: "Portugal", code: "+351",
    states: [
      { name: "Lisbon", cities: ["Lisbon", "Sintra", "Cascais", "Amadora"] },
      { name: "Porto", cities: ["Porto", "Vila Nova de Gaia", "Matosinhos"] },
      { name: "Algarve", cities: ["Faro", "Albufeira", "Portimão", "Lagos"] },
    ],
  },
  {
    name: "Ireland", code: "+353",
    states: [
      { name: "Leinster", cities: ["Dublin", "Kilkenny", "Drogheda", "Dundalk"] },
      { name: "Munster", cities: ["Cork", "Limerick", "Waterford", "Killarney"] },
      { name: "Connacht", cities: ["Galway", "Sligo", "Castlebar"] },
      { name: "Ulster", cities: ["Donegal", "Letterkenny", "Monaghan"] },
    ],
  },
  {
    name: "Switzerland", code: "+41",
    states: [
      { name: "Zürich", cities: ["Zürich", "Winterthur"] },
      { name: "Bern", cities: ["Bern", "Thun", "Biel/Bienne"] },
      { name: "Geneva", cities: ["Geneva", "Carouge", "Lancy"] },
      { name: "Basel", cities: ["Basel", "Riehen", "Allschwil"] },
      { name: "Vaud", cities: ["Lausanne", "Montreux", "Nyon"] },
    ],
  },
  {
    name: "Austria", code: "+43",
    states: [
      { name: "Vienna", cities: ["Vienna"] },
      { name: "Salzburg", cities: ["Salzburg", "Hallein"] },
      { name: "Tyrol", cities: ["Innsbruck", "Kufstein", "Hall in Tirol"] },
      { name: "Upper Austria", cities: ["Linz", "Wels", "Steyr"] },
    ],
  },
  {
    name: "Norway", code: "+47",
    states: [
      { name: "Oslo", cities: ["Oslo"] },
      { name: "Vestland", cities: ["Bergen", "Askøy"] },
      { name: "Rogaland", cities: ["Stavanger", "Sandnes", "Haugesund"] },
      { name: "Trøndelag", cities: ["Trondheim", "Steinkjer"] },
    ],
  },
  {
    name: "Denmark", code: "+45",
    states: [
      { name: "Capital Region", cities: ["Copenhagen", "Frederiksberg", "Helsingør"] },
      { name: "Central Denmark", cities: ["Aarhus", "Randers", "Herning", "Viborg"] },
      { name: "Southern Denmark", cities: ["Odense", "Esbjerg", "Kolding", "Vejle"] },
    ],
  },
  {
    name: "Finland", code: "+358",
    states: [
      { name: "Uusimaa", cities: ["Helsinki", "Espoo", "Vantaa"] },
      { name: "Pirkanmaa", cities: ["Tampere", "Nokia", "Ylöjärvi"] },
      { name: "Southwest Finland", cities: ["Turku", "Salo", "Kaarina"] },
    ],
  },
  {
    name: "Sri Lanka", code: "+94",
    states: [
      { name: "Western", cities: ["Colombo", "Dehiwala-Mount Lavinia", "Moratuwa", "Negombo"] },
      { name: "Central", cities: ["Kandy", "Nuwara Eliya", "Matale"] },
      { name: "Southern", cities: ["Galle", "Matara", "Hambantota"] },
      { name: "Northern", cities: ["Jaffna", "Kilinochchi"] },
    ],
  },
  {
    name: "Nepal", code: "+977",
    states: [
      { name: "Bagmati", cities: ["Kathmandu", "Lalitpur", "Bhaktapur"] },
      { name: "Gandaki", cities: ["Pokhara", "Gorkha"] },
      { name: "Lumbini", cities: ["Butwal", "Bhairahawa"] },
      { name: "Province 2", cities: ["Janakpur", "Birgunj"] },
    ],
  },
];

// Sorted by country name
export const allCountries = locationDatabase.sort((a, b) => a.name.localeCompare(b.name));

// Phone code to country mapping (longest match first for disambiguation)
const phoneCodeMap: { code: string; country: string }[] = locationDatabase
  .map((c) => ({ code: c.code, country: c.name }))
  .sort((a, b) => b.code.length - a.code.length);

export function detectCountryFromPhone(phone: string): string | null {
  const cleaned = phone.replace(/[\s\-()]/g, "");
  if (!cleaned.startsWith("+")) return null;
  for (const entry of phoneCodeMap) {
    if (cleaned.startsWith(entry.code)) {
      return entry.country;
    }
  }
  return null;
}

export function getStatesForCountry(countryName: string): string[] {
  const country = locationDatabase.find((c) => c.name === countryName);
  return country ? country.states.map((s) => s.name) : [];
}

export function getCitiesForState(countryName: string, stateName: string): string[] {
  const country = locationDatabase.find((c) => c.name === countryName);
  if (!country) return [];
  const state = country.states.find((s) => s.name === stateName);
  return state ? state.cities : [];
}
