type Location = {
  name: string,
  roles: string[]; 
};

export const locations_1: Location[] = [ // 7 roles + 1 spy = 8 players max
  { name: "Airplane", roles: ["First Class Passenger", "Air Marshall", "Mechanic", "Economy Class Passenger", "Stewardess", "Co-Pilot", "Captain"] },
  { name: "Bank", roles: ["Armored Car Driver", "Manager", "Consultant", "Customer", "Robber", "Security Guard", "Teller"] },
  { name: "Beach", roles: ["Beach Waitress", "Kite Surfer", "Lifeguard", "Thief", "Beach Goer", "Beach Photographer", "Ice Cream Truck Driver"] },
  { name: "Broadway Theater", roles: ["Coat Check Lady", "Prompter", "Cashier", "Visitor", "Director", "Actor", "Crewman"] },
  { name: "Casino", roles: ["Bartender", "Head Security Guard", "Bouncer", "Manager", "Hustler", "Dealer", "Gambler"] },
  { name: "Cathedral", roles: ["Priest", "Beggar", "Sinner", "Parishioner", "Tourist", "Sponsor", "Choir Singer"] },
  { name: "Circus Tent", roles: ["Acrobat", "Animal Trainer", "Magician", "Visitor", "Fire Eater", "Clown", "Juggler"] },
  { name: "Corporate Party", roles: ["Entertainer", "Manager", "Unwelcomed Guest", "Owner", "Secretary", "Accountant", "Delivery Boy"] },
  { name: "Crusader Army", roles: ["Monk", "Imprisoned Arab", "Servant", "Bishop", "Squire", "Archer", "Knight"] },
  { name: "Day Spa", roles: ["Customer", "Stylist", "Masseuse", "Manicurist", "Makeup Artist", "Dermatologist", "Beautician"] },
  { name: "Embassy", roles: ["Security Guard", "Secretary", "Ambassador", "Government Official", "Tourist", "Refugee", "Diplomat"] },
  { name: "Hospital", roles: ["Nurse", "Doctor", "Anesthesiologist", "Intern", "Patient", "Therapist", "Surgeon"] },
  { name: "Hotel", roles: ["Doorman", "Security Guard", "Manager", "Housekeeper", "Customer", "Bartender", "Bellman"] },
  { name: "Military Base", roles: ["Deserter", "Colonel", "Medic", "Soldier", "Sniper", "Officer", "Tank Engineer"] },
  { name: "Movie Studio", roles: ["Stuntman", "Sound Engineer", "Cameraman", "Director", "Costume Artist", "Actor", "Producer"] },
  { name: "Ocean Liner", roles: ["Rich Passenger", "Cook", "Captain", "Bartender", "Musician", "Waiter", "Mechanic"] },
  { name: "Passenger Train", roles: ["Mechanic", "Border Patrol", "Train Attendant", "Passenger", "Restaurant Chef", "Engineer", "Stoker"] },
  { name: "Pirate Ship", roles: ["Cook", "Sailor", "Slave", "Cannoneer", "Bound Prisoner", "Cabin Boy", "Brave Captain"] },
  { name: "Polar Station", roles: ["Medic", "Geologist", "Expedition Leader", "Biologist", "Radioman", "Hydrologist", "Meteorologist"] },
  { name: "Police Station", roles: ["Detective", "Lawyer", "Journalist", "Criminalist", "Archivist", "Patrol Officer", "Criminal"] },
  { name: "Restaurant", roles: ["Musician", "Customer", "Bouncer", "Hostess", "Head Chef", "Food Critic", "Waiter"] },
  { name: "School", roles: ["Gym Teacher", "Student", "Principal", "Security Guard", "Janitor", "Lunch Lady", "Maintenance Man"] },
  { name: "Service Station", roles: ["Manager", "Tire Specialist", "Biker", "Car Owner", "Car Wash Operator", "Electrician", "Auto Mechanic"] },
  { name: "Space Station", roles: ["Engineer", "Alien", "Space Tourist", "Pilot", "Commander", "Scientist", "Doctor"] },
  { name: "Submarine", roles: ["Cook", "Commander", "Sonar Technician", "Electronics Technician", "Sailor", "Radioman", "Navigator"] },
  { name: "Supermarket", roles: ["Customer", "Cashier", "Butcher", "Janitor", "Security Guard", "Food Sample Demonstrator", "Shelf Stocker"] },
  { name: "University", roles: ["Graduate Student", "Professor", "Dean", "Psychologist", "Maintenance Man", "Student", "Janitor"] },
];


export const locations_2: Location[] = [ // 10 roles + 1 spy = 11 players max
  { name: "Amusement Park", roles: ["Ride Operator", "Parent", "Food Vendor", "Cashier", "Happy Child", "Annoying Child", "Teenager", "Janitor", "Security Guard", "Parent"] },
  { name: "Art Museum", roles: ["Ticket Seller", "Student", "Visitor", "Teacher", "Security Guard", "Painter", "Art Collector", "Art Critic", "Photographer", "Tourist"] },
  { name: "Candy Factory", roles: ["Madcap Redhead", "Pastry Chef", "Visitor", "Taster", "Truffle Maker", "Taster", "Supply Worker", "Oompa Loompa", "Inspector", "Machine Operator"] },
  { name: "Cat Show", roles: ["Judge", "Cat-Handler", "Veterinarian", "Security Guard", "Cat Trainer", "Crazy Cat Lady", "Animal Lover", "Cat Owner", "Cat", "Cat"] },
  { name: "Cemetery", roles: ["Priest", "Gothic Girl", "Grave Robber", "Poet", "Mourning Person", "Gatekeeper", "Dead Person", "Relative", "Flower Seller", "Grave Digger"] },
  { name: "Coal Mine", roles: ["Safety Inspector", "Miner", "Overseer", "Dump Truck Operator", "Driller", "Coordinator", "Blasting Engineer", "Miner", "Solid Waste Engineer", "Worker"] },
  { name: "Construction Site", roles: ["Free-Roaming Toddler", "Contractor", "Crane Driver", "Trespasser", "Safety Officer", "Electrician", "Engineer", "Architect", "Construction Worker", "Construction Worker"] },
  { name: "Gaming Convention", roles: ["Blogger", "Cosplayer", "Gamer", "Exhibitor", "Collector", "Child", "Security Guard", "Geek", "Shy Person", "Famous Person"] },
  { name: "Gas Station", roles: ["Car Enthusiast", "Service Attendant", "Shopkeeper", "Customer", "Car Washer", "Cashier", "Customer", "Climate Change Activist", "Service Attendant", "Manager"] },
  { name: "Harbor Docks", roles: ["Loader", "Salty Old Pirate", "Captain", "Sailor", "Loader", "Fisherman", "Exporter", "Cargo Overseer", "Cargo Inspector", "Smuggler"] },
  { name: "Ice Hockey Stadium", roles: ["Hockey Fan", "Medic", "Hockey Player", "Food Vendor", "Security Guard", "Goaltender", "Coach", "Referee", "Spectator", "Hockey Player"] },
  { name: "Jail", roles: ["Wrongly Accused Man", "CCTV Operator", "Guard", "Visitor", "Lawyer", "Janitor", "Jailkeeper", "Criminal", "Correctional Officer", "Maniac"] },
  { name: "Jazz Club", roles: ["Bouncer", "Drummer", "Pianist", "Saxophonist", "Singer", "Jazz Fanatic", "Dancer", "Barman", "VIP", "Waiter"] },
  { name: "Library", roles: ["Old Man", "Journalist", "Author", "Volunteer", "Know-It-All", "Student", "Librarian", "Loudmouth", "Book Fanatic", "Nerd"] },
  { name: "Night Club", roles: ["Regular", "Bartender", "Security Guard", "Dancer", "Pick-Up Artist", "Party Girl", "Model", "Muscly Guy", "Drunk Person", "Shy Person"] },
  { name: "Race Track", roles: ["Team Owner", "Driver", "Engineer", "Spectator", "Referee", "Mechanic", "Food Vendor", "Commentator", "Bookmaker", "Spectator"] },
  { name: "Retirement Home", roles: ["Relative", "Cribbage Player", "Old Person", "Nurse", "Janitor", "Cook", "Blind Person", "Psychologist", "Old Person", "Nurse"] },
  { name: "Rock Concert", roles: ["Dancer", "Singer", "Fan", "Guitarist", "Drummer", "Roadie", "Stage Diver", "Security Guard", "Bassist", "Technical Support"] },
  { name: "Sightseeing Bus", roles: ["Old Man", "Lone Tourist", "Driver", "Annoying Child", "Tourist", "Tour Guide", "Photographer", "Tourist", "Lost Person"] },
  { name: "Spa Resort", roles: ["Customer", "Receptionist", "Therapist", "Wellness Coach", "Pool Attendant", "Masseuse", "Yoga Instructor", "Barista", "Cleaner", "Therapist"] },
  { name: "Theme Park", roles: ["Thrill Seeker", "Concession Stand Worker", "Ride Designer", "Security Guard", "Guest", "Tour Guide", "Vendor", "Technician", "Maintenance Worker", "Happily Exhausted Parent"] },
  { name: "University Campus", roles: ["Student", "Professor", "Alumni", "Teaching Assistant", "Registrar", "Bookstore Clerk", "Cafeteria Worker", "Campus Security", "Tour Guide", "Researcher"] },
  { name: "Water Park", roles: ["Lifeguard", "Swimmer", "Water Slide Operator", "Concessions Worker", "Security Guard", "Visitor", "Teenager", "Family Member", "Facility Manager", "Lifeguard"] },
  { name: "Zoo", roles: ["Zookeeper", "Visitor", "Veterinarian", "Tourist", "Guide", "Child", "Photographer", "Ticket Seller", "Exhibit Worker", "Wildlife Biologist"] }
];


