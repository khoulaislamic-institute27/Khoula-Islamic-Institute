# WordPress LMS Integration Guide (Tutor LMS / LearnDash)
## Khoula Islamic Institute (`khoulainstituteofquranicstudies.com`)
**Turnkey Architecture for Online Quran Courses, Enrollments, Lessons & Progress Tracking**

---

## 1. LMS Plugin Recommendation: Tutor LMS Pro vs. LearnDash

For an Online Quran & Islamic Academy with 1-on-1 and small group live classes, **Tutor LMS Pro** is strongly recommended over LearnDash for the following reasons:

| Feature | Tutor LMS Pro (Recommended) | LearnDash LMS |
| :--- | :--- | :--- |
| **Frontend Student Dashboard** | Native, elegant, self-contained dashboard without exposing WordPress `/wp-admin/`. | Requires third-party add-ons or custom page builder templates. |
| **Live Virtual Classroom** | Native 1-click **Zoom & Google Meet Integration** creates automated encrypted meetings per lesson. | Requires external Zapier webhooks or costly third-party plugins. |
| **Teacher / Qari Portal** | Dedicated frontend instructor dashboard for Qaris to mark attendance and grade recitations. | Requires WP backend or Uncanny Toolkit Pro. |
| **Monetization & Tuition** | Direct native integration with **WooCommerce & WooCommerce Subscriptions**. | Supported via WooCommerce or LearnDash native Stripe. |
| **RTL & Arabic Script** | 100% RTL compliant with Urdu/Arabic font support. | Requires custom CSS tweaks for RTL layouts. |
| **Certificate Builder** | Drag-and-drop visual certificate designer with custom Islamic fonts and crests. | Shortcode-based PDF generation. |

---

## 2. Step-by-Step WordPress Implementation Roadmap

### Step 1: Install Core Plugins
1. **Tutor LMS Pro** (`tutor-pro.zip`)
2. **WooCommerce** (Product catalog and recurring tuition billing)
3. **WooCommerce Subscriptions** (Automatic monthly collection in PKR, USD, GBP, AED)
4. **Tutor LMS Zoom Integration Addon** (Automated 1-on-1 video rooms)
5. **Elementor Pro** (To style course overview pages and single lesson templates)
6. **Fluent Forms Pro / WPForms** (3-Day Free Trial booking forms with conditional routing)

---

### Step 2: Course Structure Configuration in Tutor LMS

Create each course under **Tutor LMS > Courses > Add New**:

```
Course: Quran Reading & Nazra with Tajweed
├── Topic 1: Foundational Makharij (Articulations)
│   ├── Lesson 1.1: Throat Letters (Halqiyyah - ء هـ ع ح غ خ) [Audio + Video Guide]
│   ├── Lesson 1.2: Tongue & Palate Letters (Lahwiyyah & Shajariyyah)
│   └── Quiz 1: Makharij Identification Audio Test
├── Topic 2: Rules of Noon Saakin & Tanween (Ahkam-e-Noon)
│   ├── Lesson 2.1: Izhar (Clear Pronunciation)
│   ├── Lesson 2.2: Idgham with & without Ghunnah
│   ├── Lesson 2.3: Iqlab (Concealed Meem)
│   └── Lesson 2.4: Ikhfa (Nasal Whispering)
├── Topic 3: Rules of Meem Saakin & Qalqalah
│   ├── Lesson 3.1: Meem Saakin Rules (Izhar, Idgham, Ikhfa Shafawi)
│   └── Lesson 3.2: The 5 Qalqalah Letters (ق ط ب ج د)
└── Topic 4: Rules of Madd & Waqf (Stopping Signs)
    ├── Lesson 4.1: Madd Asli and Madd Far'i (2 to 6 Harakaat)
    ├── Lesson 4.2: Waqf Signs (م, ط, ج, ز, ص, لا)
    └── Final Evaluation: 1-on-1 Live Recitation Exam & Certificate
```

---

### Step 3: Quran Progress Tracker Custom Code (Sabaq / Sabqi / Manzil)

Add the following snippet to your child theme's `functions.php` to enable daily Sabaq logging inside the student profile:

```php
<?php
/**
 * Khoula Islamic Institute - Quran Sabaq, Sabqi & Manzil Tracker for Tutor LMS
 */

// 1. Register Custom Student Metadata Fields
add_action('show_user_profile', 'khoula_add_quran_tracker_fields');
add_action('edit_user_profile', 'khoula_add_quran_tracker_fields');

function khoula_add_quran_tracker_fields($user) {
    if (!current_user_can('edit_user', $user->ID)) return;
    ?>
    <h3>Khoula Institute - Daily Quran Progress Ledger</h3>
    <table class="form-table">
        <tr>
            <th><label for="khoula_today_sabaq">Today's Sabaq (New Lesson)</label></th>
            <td>
                <input type="text" name="khoula_today_sabaq" id="khoula_today_sabaq" 
                       value="<?php echo esc_attr(get_user_meta($user->ID, 'khoula_today_sabaq', true)); ?>" class="regular-text" />
                <p class="description">e.g., Surah Al-Baqarah Ayahs 1-10</p>
            </td>
        </tr>
        <tr>
            <th><label for="khoula_sabaq_grade">Sabaq Performance Grade</label></th>
            <td>
                <select name="khoula_sabaq_grade" id="khoula_sabaq_grade">
                    <?php 
                    $grade = get_user_meta($user->ID, 'khoula_sabaq_grade', true);
                    $options = ['Mumtaz (A+)', 'Jayyid Jiddan (A)', 'Jayyid (B)', 'Needs Revision (C)'];
                    foreach ($options as $opt) {
                        echo '<option value="'.$opt.'" '.selected($grade, $opt, false).'>'.$opt.'</option>';
                    }
                    ?>
                </select>
            </td>
        </tr>
        <tr>
            <th><label for="khoula_sabqi">Sabqi (Recent Revision)</label></th>
            <td>
                <input type="text" name="khoula_sabqi" id="khoula_sabqi" 
                       value="<?php echo esc_attr(get_user_meta($user->ID, 'khoula_sabqi', true)); ?>" class="regular-text" />
            </td>
        </tr>
        <tr>
            <th><label for="khoula_manzil">Manzil (Cumulative Muraja'ah)</label></th>
            <td>
                <input type="text" name="khoula_manzil" id="khoula_manzil" 
                       value="<?php echo esc_attr(get_user_meta($user->ID, 'khoula_manzil', true)); ?>" class="regular-text" />
            </td>
        </tr>
    </table>
    <?php
}

// 2. Save Custom Student Metadata
add_action('personal_options_update', 'khoula_save_quran_tracker_fields');
add_action('edit_user_profile_update', 'khoula_save_quran_tracker_fields');

function khoula_save_quran_tracker_fields($user_id) {
    if (!current_user_can('edit_user', $user_id)) return;
    update_user_meta($user_id, 'khoula_today_sabaq', sanitize_text_field($_POST['khoula_today_sabaq']));
    update_user_meta($user_id, 'khoula_sabaq_grade', sanitize_text_field($_POST['khoula_sabaq_grade']));
    update_user_meta($user_id, 'khoula_sabqi', sanitize_text_field($_POST['khoula_sabqi']));
    update_user_meta($user_id, 'khoula_manzil', sanitize_text_field($_POST['khoula_manzil']));
}
```

---

### Step 4: Zoom Integration for 1-on-1 Classes

1. Visit [marketplace.zoom.us](https://marketplace.zoom.us/) and create a **Server-to-Server OAuth App**.
2. Copy the **Account ID**, **Client ID**, and **Client Secret**.
3. In WordPress, navigate to **Tutor LMS Pro > Settings > Zoom**.
4. Paste the API credentials and click **Save Settings**.
5. Enable *"Host Video Upon Launch"* and set meeting duration to 30 or 45 minutes.
6. When teachers or admins schedule a class, a unique secure Zoom link is automatically generated for the student.

---

### Step 5: WooCommerce Subscriptions Recurring Tuition Setup

1. In WooCommerce, create a new product: **"Quran Nazra - Standard Plan (3 Days/Week)"**.
2. Under Product Data, select **"Simple Subscription"**.
3. Subscription Price: Set to `$48` (or `PKR 9,000`) every **1 month**.
4. In Tutor LMS Course Settings, select **"Monetize with WooCommerce"** and link this product.
5. When the student checks out via Stripe, JazzCash, or EasyPaisa, they are automatically enrolled in the course for 30 days. Recurring charges renewal keeps the enrollment active seamlessly.
