function autoReplyWithResume() {
  var label = GmailApp.getUserLabelByName("AutoReply");
  var threads = label.getThreads(0, 10); // Fetch the most recent 10 threads in the label

  threads.forEach(function(thread) {
    var messages = thread.getMessages();
    var lastMessage = messages[messages.length - 1];
    
    if (lastMessage.isUnread()) {
      var recipient = lastMessage.getFrom();
      var subject = "Sharath Kumar Resume";
      var body = "Hi \n \nI am interested in this position and have attached my resume for your review. I am looking only for C2C and REMOTE position currently. \n\n Thanks & Regards \nSharath Kumar Kaparthy\n Phone: (762)390-7532";
      
      // Attach the resume (stored in Google Drive)
      var resume = DriveApp.getFileById("1ybwuS2FB_DMTVqOpl0Au639FwAGP4bR1YbQFzsN2wpM");
      
      GmailApp.sendEmail(recipient, subject, body, {
        attachments: [resume.getAs(MimeType.PDF)]
      });
      
      lastMessage.markRead();
      thread.removeLabel(label); // Remove the label after replying
    }
  });
}
