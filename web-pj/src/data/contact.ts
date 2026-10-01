export const contact = {
  email: "janreydevmina@gmail.com",
  phone: "0961 917 4255",
  phoneHref: "tel:+639619174255",
  whatsapp: "https://wa.me/639619174255",
  github: "https://github.com/janreyHablaMina",
};

export const contactChannels = [
  { name: "Email", detail: contact.email, description: "For ideas, introductions, and everything in between.", href: `mailto:${contact.email}`, action: "Write to us", icon: "email" },
  { name: "WhatsApp", detail: contact.phone, description: "Prefer a conversation? Start with a simple hello.", href: contact.whatsapp, action: "Start a chat", icon: "chat" },
  { name: "GitHub", detail: "@janreyHablaMina", description: "Explore the code and craft behind our digital work.", href: contact.github, action: "Explore our work", icon: "github" },
] as const;
