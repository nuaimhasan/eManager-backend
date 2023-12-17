const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const port = process.env.port || 5001;

const administratorRoutes = require("./routes/administrator.routes");
const logoRoutes = require("./routes/logo.routes");
const serviceRoutes = require("./routes/service.routes");
const serviceBannerRoutes = require("./routes/serviceBanner.routes");
const serviceSectionRoutes = require("./routes/serviceSection.routes");
const bannerRoutes = require("./routes/banner.routes");
const aboutRoutes = require("./routes/about.routes");
const contactRoutes = require("./routes/contact.routes");
const clientRoutes = require("./routes/client.routes");
const whyChooseRoutes = require("./routes/whyChoose.routes");
const blogRoutes = require("./routes/blog.routes");
const blogSectionRoutes = require("./routes//BlogSection.routes");
const counterRoutes = require("./routes/counter.routes");
const careerBannerRoutes = require("./routes/careerBanner.route");
const jobRoutes = require("./routes/job.routes");
const jobApplyFormRoutes = require("./routes/JobApplyForm.routes");
const jobBenefitRoutes = require("./routes/jobBenefit.routes");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("uploads"));

// Connect Database
mongoose.connect(process.env.DB_URL).then(() => {
  console.log("Database connection is successful");
});

app.use("/admin", administratorRoutes);
app.use("/logo", logoRoutes);
app.use("/service", serviceRoutes);
app.use("/serviceBanner", serviceBannerRoutes);
app.use("/serviceSection", serviceSectionRoutes);
app.use("/banner", bannerRoutes);
app.use("/about", aboutRoutes);
app.use("/contact", contactRoutes);
app.use("/client", clientRoutes);
app.use("/whyChoose", whyChooseRoutes);
app.use("/blog", blogRoutes);
app.use("/counter", counterRoutes);
app.use("/blogSection", blogSectionRoutes);
app.use("/careerBanner", careerBannerRoutes);
app.use("/job", jobRoutes);
app.use("/jobApplyForm", jobApplyFormRoutes);
app.use("/jobBenefit", jobBenefitRoutes);

app.get("/", (req, res) => {
  res.send(`Server is Running on port ${port}`);
});

app.listen(port, () => {
  console.log(`Server is Running on port ${port}`);
});
