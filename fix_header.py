content = open('/Users/kosi/Desktop/Football Sim/Madden NFL 27 Team Power Rankings & Draft Simulator (7).html', 'rb').read()

# Search for the exact bytes: "Lineup & flex</h4>" where & is the literal byte 0x26
# But in the file it's "Lineup & flex</h4>" where & is the entity
old_bytes = b'Lineup & flex</h4>'
new_bytes = b'Lineup & flex (returner in Special Teams)</h4>'

if old_bytes in content:
    content = content.replace(old_bytes, new_bytes)
    open('/Users/kosi/Desktop/Football Sim/Madden NFL 27 Team Power Rankings & Draft Simulator (7).html', 'wb').write(content)
    print('Done with &!')
elif b'Lineup & flex</h4>' in content:
    content = content.replace(b'Lineup & flex</h4>', b'Lineup & flex (returner in Special Teams)</h4>')
    open('/Users/kosi/Desktop/Football Sim/Madden NFL 27 Team Power Rankings & Draft Simulator (7).html', 'wb').write(content)
    print('Done with &!')
else:
    print('NOT FOUND')
    # Search for Lineup
    idx = content.find(b'Lineup')
    while idx >= 0:
        context = content[idx:idx+50]
        print(f'At {idx}: {context}')
        idx = content.find(b'Lineup', idx+1)