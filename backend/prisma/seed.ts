import {
  PrismaClient,
  Role,
  AcademicDegree,
  StudyForm,
  PaymentType,
  CertificateType,
  CertificateDeliveryType,
  CertificateStatus,
  ScholarshipType,
  ScholarshipStatus,
  PaymentStatus,
} from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding UniHub test database with synthetic mock data...');

  const passwordHash = await bcrypt.hash('StudentTest2026!', 10);

  // 1. Create or upsert synthetic student user
  const user = await prisma.user.upsert({
    where: { email: 'student.test@student.karazin.ua' },
    update: {},
    create: {
      email: 'student.test@student.karazin.ua',
      name: 'Олександр Петренко',
      password: passwordHash,
      role: Role.STUDENT,
      moodleId: '9842',
      token: 'synthetic_moodle_token_2026',
    },
  });

  // 2. Create or upsert student profile
  await prisma.studentProfile.upsert({
    where: { userId: user.id },
    update: {
      ratingScore: 88.5,
    },
    create: {
      userId: user.id,
      university: 'Харківський національний університет імені В. Н. Каразіна',
      faculty: 'ННІ комп’ютерних наук та штучного інтелекту',
      specialty: '122 Комп’ютерні науки',
      specialtyCode: '122',
      degree: AcademicDegree.BACHELOR,
      group: 'КС-12',
      course: 2,
      semester: 4,
      studyForm: StudyForm.FULL_TIME,
      paymentType: PaymentType.BUDGET,
      studentCardNumber: 'KB № 84920194',
      recordBookNumber: 'ЗК-24-122-014',
      ratingScore: 88.5,
      totalCredits: 240,
      completedCredits: 90,
    },
  });

  // 3. Create sample certificate requests
  const cert1 = await prisma.certificateRequest.upsert({
    where: { verificationCode: 'KZ-2026-DOC-4920' },
    update: {},
    create: {
      userId: user.id,
      type: CertificateType.STUDY_CONFIRMATION,
      purpose: 'За місцем вимоги',
      deliveryType: CertificateDeliveryType.DIGITAL_PDF,
      status: CertificateStatus.SIGNED,
      verificationCode: 'KZ-2026-DOC-4920',
      pdfUrl: 'https://storage.karazin.ua/certificates/doc-4920.pdf',
    },
  });

  const cert2 = await prisma.certificateRequest.upsert({
    where: { verificationCode: 'KZ-2026-TCK-1102' },
    update: {},
    create: {
      userId: user.id,
      type: CertificateType.CONSCRIPTION_DEFERRAL,
      purpose: 'ТЦК та СП Шевченківського району',
      deliveryType: CertificateDeliveryType.PHYSICAL_DEAN,
      status: CertificateStatus.IN_PROGRESS,
      verificationCode: 'KZ-2026-TCK-1102',
    },
  });

  // 4. Create sample scholarship records
  const months = [
    { m: 4, y: 2026, amt: 2000.0, st: ScholarshipStatus.PAID },
    { m: 5, y: 2026, amt: 2000.0, st: ScholarshipStatus.PAID },
    { m: 6, y: 2026, amt: 2000.0, st: ScholarshipStatus.PAID },
    { m: 7, y: 2026, amt: 2000.0, st: ScholarshipStatus.PAID },
    { m: 8, y: 2026, amt: 2000.0, st: ScholarshipStatus.PAID },
    { m: 9, y: 2026, amt: 2000.0, st: ScholarshipStatus.ACCRUED },
  ];

  for (const s of months) {
    await prisma.scholarshipRecord.upsert({
      where: {
        userId_month_year_type: {
          userId: user.id,
          month: s.m,
          year: s.y,
          type: ScholarshipType.ACADEMIC_STANDARD,
        },
      },
      update: {},
      create: {
        userId: user.id,
        month: s.m,
        year: s.y,
        type: ScholarshipType.ACADEMIC_STANDARD,
        amount: s.amt,
        status: s.st,
        bankCardMask: '•••• 8492',
        paidAt: s.st === ScholarshipStatus.PAID ? new Date(s.y, s.m - 1, 25) : null,
      },
    });
  }

  // 5. Create sample payment transaction
  await prisma.paymentTransaction.create({
    data: {
      userId: user.id,
      amount: 1450.0,
      purpose: 'Оплата за проживання в гуртожитку № 4',
      status: PaymentStatus.COMPLETED,
      recipientName: 'Харківський національний університет імені В. Н. Каразіна',
      recipientIban: 'UA483510050000026001234567890',
      edrpou: '02071205',
      paidAt: new Date(),
    },
  });

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
