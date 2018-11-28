'''
main python script for running all fetch scripts
'''

import B1620_fetch
import dem_gen_fetch
import elexon_fetch
import interconnector_freq_fetch
import weather_fetch

B1620_fetch.main()
dem_gen_fetch.main()
elexon_fetch.main()
interconnector_freq_fetch.main()
weather_fetch.main()
