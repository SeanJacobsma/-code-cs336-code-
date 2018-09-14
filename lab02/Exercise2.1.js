function Person(name, birthdate, friends, greeting) {
    this.name = name;
    this.birthdate = birthdate;
    this.friends = friends;
    this.greating = greeting;    
}

Person.prototype.addFriend = function(newFriend) {
    this.Friends = friends + ", " + newFriend;
};

Person.prototype.calculateAge = function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

var person1 = new Person("Moe", "06/19/1897" , "Larry, Curly", "Why I ouhta...");
console.log(Person1);
var person2 = new Person("Larry", "10/5/1902", "Curly", "What's the idea?");
var person3 = new Person("Curly", "10/22/1903", "", "Nyuk Nyuk Nyuk!");
Preson2.addFriend("Curly");
console.log(person2);
person3.addFrined("Larry, Moe");
console.log(person3);
console.log(person2.calculateAge);
