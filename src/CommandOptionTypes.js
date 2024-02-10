
const TypeMapping = {
  "SUB_COMMAND": 1,
  "SUB_COMMAND_GROUP": 2,
  "STRING": 3,
  "INTEGER": 4,
  "BOOLEAN": 5,
  "USER": 6,
  "CHANNEL": 7,
  "ROLE": 8,
  "MENTIONABLE": 9,
  "NUMBER": 10,
  "ATTACHMENT": 11,
};

const OptionTypes = {
  SubCommand: TypeMapping["SUB_COMMAND"],
  String: TypeMapping["STRING"],
  Integer: TypeMapping["INTEGER"],
  Boolean: TypeMapping["BOOLEAN"],
  User: TypeMapping["USER"],
  Channel: TypeMapping["CHANNEL"],
  Role: TypeMapping["ROLE"],
  Mentionable: TypeMapping["MENTIONABLE"],
  Number: TypeMapping["NUMBER"],
  Attachment: TypeMapping["ATTACHMENT"],
};

module.exports = OptionTypes;
  