class rowLetter {
  constructor(name, messageRow, receiverIds, receiverMessages, fieldsObj){
    this.name = name;
    this.messageRow = messageRow;
    this.receiverIds = receiverIds;
    this.receiverMessages = receiverMessages;
    this.fieldsObj = fieldsObj;
  }

  getletterTemplateStructure() {
    const personalizedLetters =  this.receiverIds.map((id, index) => {
      let changableFields;
      if(Object.keys(this.fieldsObj) === 0){
        changableFields = [];
      }else{
        changableFields = Object.keys(this.fieldsObj).map((fieldName) => {
          return {
            fieldName,
            fieldValue: this.fieldsObj[fieldName][index]
          }
        });
      }
      return {
        receiver: id,
        letterText: this.receiverMessages[index],
        changableFields
      };
    });

    return {
      name: this.name,
      letterTextRow: this.messageRow,
      personalizedLetters
    };
  };

};

module.exports = rowLetter;
