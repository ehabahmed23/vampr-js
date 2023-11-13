class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let count = 0;
    let currentVampire = this;

    while (currentVampire.creator) {
      currentVampire = currentVampire.creator;
      count++
    }
    return count;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
     if (this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal) {
      return true;
    }

    return false;
  }

  // Returns the vampire object with that name, or null if no vampire exists with that name
  vampireWithName(name) {
    
    console.log('name being searched', name)

    if (this.name === name) {
      console.log('found a match!', this.name);
      return this;
    }
    
    for (const offspring of this.offspring) {
      console.log('offspring', offspring.name);
      const vampWeLookingFor = offspring.vampireWithName(name);
      if (vampWeLookingFor) {
        return vampWeLookingFor;
      }
    }

    return null;
    
  }

  // Returns the total number of vampires that exist
  get totalDescendents() {
     // set counter to zero
     let counter = 0;
     console.log('current iteration:', this.name);
     // for the first 'root' vamp (do not) add one to counter 
    
     // traverse through each node after the root vamp
     for (const offspring of this.offspring) {
       counter += 1; //omg it was this. Put counter in node iteration loop.
       // on each node add to the counter
       // remember to assign each recursive case a variable
       const depthCounter = offspring.totalDescendents;
       // counter = counter + the variable --> continue iterating.
       counter += depthCounter;
     }
     
     console.log('iteration:', this.name, 'counter just before return:', counter);
     return counter;
   
  }

  // Returns an array of all the vampires that were converted after 1980
  get allMillennialVampires() {
     console.log('current iteration:', this.name);
    // create global empty array variable for vampires we're looking for
    // must use let instead of const bc of .concat() method we use. .push() will return nested array.
    let vampsConvertedBefore1980 = [];
    // create conditional if statement for vampires and add to array if they were converted after 1980
    if (this.yearConverted > 1980) {
      vampsConvertedBefore1980.push(this);
    }

    // iterate over each descendant via depth first traversal
    for (const offspring of this.offspring) {
      // create variable for whatever array is returned from recursive case 
      const depthArray = offspring.allMillennialVampires;
      // add recursive case array to global array
      vampsConvertedBefore1980 = vampsConvertedBefore1980.concat(depthArray);
    }

    // after traversal, return global array.
    // console.log('before final return:', vampsConvertedBefore1980);
    return vampsConvertedBefore1980;
  }
  }

  /** Tree traversal methods **/
  

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  // closestCommonAncestor(vampire) {

  // }

module.exports = Vampire;

