const courseSectors = # Full Course → Work Sectors (including tertiary for Education)
course_sectors = {
    "African Languages": ["Translation", "Cultural Heritage", "Linguistics"],
    "English": ["Literary Studies", "Creative Writing", "Publishing"],
    "Afrikaans": ["Translation", "Language Studies", "Education"],
    ...
    "Human Settlements Management": ["Housing Development", "Urban Development", "Public Administration"]
}

province_towns = {
    "Gauteng": ["Johannesburg","Pretoria","Soweto","Benoni","Boksburg","Vereeniging","Krugersdorp","Centurion","Midrand"],
    "Western Cape": ["Cape Town","Stellenbosch","Paarl","George","Knysna","Mossel Bay","Worcester"],
    ...
    "Northern Cape": ["Kimberley","Upington","Springbok","De Aar","Kuruman"]
}

@app.route('/manifest.json')
def manifest():
    return send_from_directory('static', 'manifest.json')

@app.route('/', methods=['GET','POST'])
def login():
    if request.method=='POST':
        session['first_name']=request.form['first_name']
        session['surname']=request.form['surname']
        session['email']=request.form['email']
        return redirect(url_for('confirm_login'))
    return render_template('login.html')

@app.route('/confirm-login', methods=['GET','POST'])
def confirm_login():
    if request.method=='POST':
        return redirect(url_for('duration'))
    return render_template('confirm_login.html',
        first_name=session.get('first_name'),
        surname=session.get('surname'),
        email=session.get('email')
    )

@app.route('/duration', methods=['GET','POST'])
def duration():
    if request.method=='POST':
        return redirect(url_for('select_course'))
    return render_template('duration.html')

@app.route('/select-course', methods=['GET','POST'])
def select_course():
    if request.method=='POST':
        session['course']=request.form['course']
        return redirect(url_for('select_province'))
    return render_template('select.html', course_industries=course_sectors)

@app.route('/select-province', methods=['GET','POST'])
def select_province():
    if request.method=='POST':
        session['province']=request.form['province']
        return redirect(url_for('locations'))
    return render_template('select_province.html', provinces=province_towns.keys())

@app.route('/locations')
def locations():
    course = session.get('course')
    province = session.get('province')
    rows = [(town, course_sectors.get(course, [])) for town in province_towns.get(province, [])]
    return render_template('locations.html', course=course, province=province, rows=rows)