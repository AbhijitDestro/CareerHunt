import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User } from './models/User.js';
import { Company } from './models/Company.js';
import { Job } from './models/Job.js';
import bcrypt from 'bcryptjs';

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB connected to host: ${mongoose.connection.host} and name: ${mongoose.connection.name}`);
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1);
    }
};

const seedDatabase = async () => {
    try {
        await connectDB();

        // Clear existing data
        await User.deleteMany({ role: 'recruiter' });
        await Company.deleteMany({});
        await Job.deleteMany({});
        console.log('Cleared existing recruiter data');

        // Recruiter data with Indian names and details
        const recruiters = [
            {
                fullname: 'Rajesh Kumar Sharma',
                email: 'rajesh.sharma@techinnovators.com',
                phoneNumber: 9876543210,
                password: 'Recruiter@123',
                role: 'recruiter',
                profile: {
                    bio: 'Experienced HR professional with 8+ years in tech recruitment',
                    companyName: 'Tech Innovators India Pvt Ltd',
                    location: 'Bengaluru, Karnataka',
                    linkedinProfile: 'https://linkedin.com/in/rajesh-kumar-sharma'
                }
            },
            {
                fullname: 'Priya Patel',
                email: 'priya.patel@digitaldreams.com',
                phoneNumber: 9876543211,
                password: 'Recruiter@123',
                role: 'recruiter',
                profile: {
                    bio: 'Senior Talent Acquisition Specialist focused on digital transformation',
                    companyName: 'Digital Dreams Solutions',
                    location: 'Mumbai, Maharashtra',
                    linkedinProfile: 'https://linkedin.com/in/priya-patel-hr'
                }
            },
            {
                fullname: 'Arjun Reddy',
                email: 'arjun.reddy@nextgencorp.com',
                phoneNumber: 9876543212,
                password: 'Recruiter@123',
                role: 'recruiter',
                profile: {
                    bio: 'HR Director with expertise in scaling startups and enterprise recruitment',
                    companyName: 'NextGen Corporation',
                    location: 'Hyderabad, Telangana',
                    linkedinProfile: 'https://linkedin.com/in/arjun-reddy-hr'
                }
            },
            {
                fullname: 'Anita Desai',
                email: 'anita.desai@cloudmasters.com',
                phoneNumber: 9876543213,
                password: 'Recruiter@123',
                role: 'recruiter',
                profile: {
                    bio: 'Cloud technology recruitment expert with 6 years experience',
                    companyName: 'Cloud Masters India',
                    location: 'Pune, Maharashtra',
                    linkedinProfile: 'https://linkedin.com/in/anita-desai-hr'
                }
            },
            {
                fullname: 'Vikram Singh',
                email: 'vikram.singh@aitalent.com',
                phoneNumber: 9876543214,
                password: 'Recruiter@123',
                role: 'recruiter',
                profile: {
                    bio: 'AI/ML talent acquisition specialist helping build future tech teams',
                    companyName: 'AI Talent Solutions',
                    location: 'Gurugram, Haryana',
                    linkedinProfile: 'https://linkedin.com/in/vikram-singh-ai'
                }
            }
        ];

        // Create recruiters
        const createdRecruiters = [];
        for (const recruiterData of recruiters) {
            const hashedPassword = await bcrypt.hash(recruiterData.password, 10);
            const recruiter = new User({
                ...recruiterData,
                password: hashedPassword
            });
            await recruiter.save();
            createdRecruiters.push(recruiter);
            console.log(`Created recruiter: ${recruiter.fullname}`);
        }

        // Company data
        const companies = [
            {
                name: 'Tech Innovators India Pvt Ltd',
                description: 'Leading software development company specializing in enterprise solutions, mobile applications, and cloud services. We help businesses transform digitally with cutting-edge technology solutions.',
                email: 'careers@techinnovators.com',
                phoneNumber: 8041234567,
                address: 'ITPL Main Road, Whitefield, Bengaluru, Karnataka 560066',
                userId: createdRecruiters[0]._id
            },
            {
                name: 'Digital Dreams Solutions',
                description: 'Premier digital transformation consultancy helping traditional businesses embrace modern technologies. We specialize in e-commerce, digital marketing, and web development.',
                email: 'hr@digitaldreams.com',
                phoneNumber: 2267890123,
                address: 'Andheri East, Mumbai, Maharashtra 400069',
                userId: createdRecruiters[1]._id
            },
            {
                name: 'NextGen Corporation',
                description: 'Innovative technology company focused on next-generation solutions including IoT, blockchain, and artificial intelligence. Building the future of technology today.',
                email: 'talent@nextgencorp.com',
                phoneNumber: 4045678901,
                address: 'HITEC City, Hyderabad, Telangana 500081',
                userId: createdRecruiters[2]._id
            },
            {
                name: 'Cloud Masters India',
                description: 'Cloud computing specialists providing AWS, Azure, and Google Cloud solutions. We help enterprises migrate, manage, and optimize their cloud infrastructure.',
                email: 'careers@cloudmasters.com',
                phoneNumber: 2067890123,
                address: 'Magarpatta City, Pune, Maharashtra 411028',
                userId: createdRecruiters[3]._id
            },
            {
                name: 'AI Talent Solutions',
                description: 'Cutting-edge AI and machine learning company developing intelligent solutions for healthcare, finance, and retail sectors. Transforming industries through artificial intelligence.',
                email: 'jobs@aitalent.com',
                phoneNumber: 1245678901,
                address: 'DLF Cyber City, Gurugram, Haryana 122002',
                userId: createdRecruiters[4]._id
            }
        ];

        // Create companies
        const createdCompanies = [];
        for (const companyData of companies) {
            const company = new Company(companyData);
            await company.save();
            createdCompanies.push(company);
            console.log(`Created company: ${company.name}`);
        }

        // Job data with Indian salary in LPA format
        const jobTitles = [
            'Senior Software Engineer',
            'Full Stack Developer',
            'Frontend Developer',
            'Backend Developer',
            'DevOps Engineer',
            'Data Scientist',
            'Product Manager',
            'UX/UI Designer',
            'Business Analyst',
            'QA Engineer'
        ];

        const jobDescriptions = [
            'We are looking for an experienced developer to join our core engineering team and work on scalable applications.',
            'Join our dynamic team to build end-to-end web applications using modern technologies and frameworks.',
            'Looking for a creative frontend developer to build responsive and user-friendly web interfaces.',
            'Seeking a backend developer to design and implement robust APIs and database architectures.',
            'DevOps engineer needed to streamline our deployment processes and infrastructure management.',
            'Data scientist required to analyze complex datasets and build predictive models for business insights.',
            'Product manager to drive product strategy and work closely with engineering and design teams.',
            'UX/UI designer to create intuitive and visually appealing user experiences for our products.',
            'Business analyst to gather requirements and bridge the gap between business needs and technical solutions.',
            'QA engineer to ensure software quality through comprehensive testing and automation.'
        ];

        const locations = [
            'Bengaluru, Karnataka',
            'Mumbai, Maharashtra',
            'Hyderabad, Telangana',
            'Pune, Maharashtra',
            'Gurugram, Haryana',
            'Chennai, Tamil Nadu',
            'Noida, Uttar Pradesh',
            'Kolkata, West Bengal',
            'Ahmedabad, Gujarat',
            'Remote, India'
        ];

        const skills = [
            ['JavaScript', 'React', 'Node.js', 'MongoDB'],
            ['Python', 'Django', 'PostgreSQL', 'AWS'],
            ['Java', 'Spring Boot', 'MySQL', 'Docker'],
            ['Angular', 'TypeScript', 'Express.js', 'Redis'],
            ['Kubernetes', 'Jenkins', 'Git', 'Linux'],
            ['Machine Learning', 'TensorFlow', 'Pandas', 'Scikit-learn'],
            ['Agile', 'Scrum', 'JIRA', 'Confluence'],
            ['Figma', 'Adobe XD', 'HTML/CSS', 'Responsive Design'],
            ['SQL', 'Excel', 'Power BI', 'Tableau'],
            ['Selenium', 'JUnit', 'Test Automation', 'CI/CD']
        ];

        // Create jobs for each company
        for (let i = 0; i < createdCompanies.length; i++) {
            const company = createdCompanies[i];
            const recruiter = createdRecruiters[i];

            for (let j = 0; j < 10; j++) {
                const salaryInLPA = Math.floor(Math.random() * 25) + 5; // 5-30 LPA range
                const experienceYears = Math.floor(Math.random() * 8) + 1; // 1-8 years experience
                const vacancies = Math.floor(Math.random() * 5) + 1; // 1-5 vacancies

                const job = new Job({
                    title: jobTitles[j],
                    description: jobDescriptions[j],
                    company: company._id,
                    location: locations[Math.floor(Math.random() * locations.length)],
                    salary: salaryInLPA, // Store as number (LPA value)
                    jobType: ['full-time', 'part-time', 'contract'][Math.floor(Math.random() * 3)],
                    vacancies: vacancies,
                    experienceLevel: experienceYears <= 2 ? 'entry-level' : experienceYears <= 5 ? 'mid-level' : 'senior-level',
                    requirements: skills[j],
                    applicationDeadline: new Date(Date.now() + (Math.random() * 60 + 30) * 24 * 60 * 60 * 1000), // 30-90 days from now
                    created_by: recruiter._id
                });

                await job.save();
                console.log(`Created job: ${job.title} at ${company.name} - ${salaryInLPA} LPA`);
            }
        }

        console.log('\n🎉 Database seeded successfully!');
        console.log(`✅ Created ${createdRecruiters.length} recruiters`);
        console.log(`✅ Created ${createdCompanies.length} companies`);
        console.log(`✅ Created ${createdCompanies.length * 10} jobs`);

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
};

// Run the seed function
seedDatabase();