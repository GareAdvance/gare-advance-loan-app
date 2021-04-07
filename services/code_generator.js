

exports.codeGenerator = (data) => {
  const uniqueID = Math.floor(1000000 + Math.random() * 900000);
  return uniqueID + data;
}