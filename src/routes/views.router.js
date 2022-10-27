import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  if (req.session?.user) {
    if (req.session.user.admin == true) return res.redirect("/admin");
    return res.redirect("current");
  }
  res.render("login");
});

router.get("/register", (req, res) => {
  if (req.session?.user) {
    if (req.session.user.admin == true) return res.redirect("/admin");
    return res.redirect("current");
  }
  res.render("register");
});

router.get("/login", (req, res) => {
  if (req.session?.user) {
    if (req.session.user.admin == true) return res.redirect("/admin");
    return res.redirect("/current");
  }
  res.render("login");
});

router.get("/current", (req, res) => {
  if (!req.session?.user) return res.redirect("/login");
  if (req.session?.user?.admin == true) return res.redirect("admin");
  res.render("current", { user: req.session.user });
});

router.get("/admin", (req, res) => {
  if (!req.session.user) return res.redirect("/login");
  if (req.session.user.admin == false) return res.redirect("current");
  res.render("admin", { user: req.session.user });
});

export default router;
